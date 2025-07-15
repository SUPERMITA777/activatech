import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    console.log("💱 [GET /api/currency] Iniciando obtención de tasa de cambio")
    
    // Try to get cached rate first
    const { data: cachedRate } = await supabase
      .from("currency_rates")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single()

    console.log("💱 [GET /api/currency] Tasa en caché:", cachedRate?.usd_to_ars)

    // Check if rate is less than 1 hour old
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    if (cachedRate && new Date(cachedRate.updated_at) > oneHourAgo) {
      console.log("💱 [GET /api/currency] Usando tasa en caché:", cachedRate.usd_to_ars)
      return NextResponse.json({ rate: cachedRate.usd_to_ars })
    }

    console.log("💱 [GET /api/currency] Tasa en caché expirada, obteniendo nueva tasa...")

    // Try to fetch fresh rate from multiple sources
    let rate = cachedRate?.usd_to_ars || 1000

    try {
      console.log("💱 [GET /api/currency] Intentando API principal (dolarhoy.com)...")
      // Try dolarhoy.com API
      const response = await fetch("https://api.dolarhoy.com/v1/cotizaciones/dolar-blue", {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      })

      if (response.ok) {
        const data = await response.json()
        rate = Number.parseFloat(data.venta) || Number.parseFloat(data.compra) || rate
        console.log("💱 [GET /api/currency] API principal exitosa, tasa:", rate)
      } else {
        console.log("💱 [GET /api/currency] API principal falló, status:", response.status)
      }
    } catch (error) {
      console.log("💱 [GET /api/currency] API principal falló, intentando backup...")

      try {
        // Backup API - dolarapi.com
        console.log("💱 [GET /api/currency] Intentando API de respaldo (dolarapi.com)...")
        const backupResponse = await fetch("https://dolarapi.com/v1/dolares/blue", {
          next: { revalidate: 3600 },
        })

        if (backupResponse.ok) {
          const backupData = await backupResponse.json()
          rate = Number.parseFloat(backupData.venta) || rate
          console.log("💱 [GET /api/currency] API de respaldo exitosa, tasa:", rate)
        } else {
          console.log("💱 [GET /api/currency] API de respaldo falló, status:", backupResponse.status)
        }
      } catch (backupError) {
        console.log("💱 [GET /api/currency] API de respaldo también falló, usando tasa en caché")
      }
    }

    // Update database with new rate
    console.log("💱 [GET /api/currency] Actualizando base de datos con nueva tasa:", rate)
    await supabase.from("currency_rates").upsert({
      usd_to_ars: rate,
      source: "dolarhoy.com",
      updated_at: new Date().toISOString(),
    })

    console.log("💱 [GET /api/currency] Tasa final devuelta:", rate)
    return NextResponse.json({ rate })
  } catch (error) {
    console.error("❌ [GET /api/currency] Error completo:", error)

    // Return cached rate or fallback
    const { data: cachedRate } = await supabase
      .from("currency_rates")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single()

    const fallbackRate = cachedRate?.usd_to_ars || 1000
    console.log("💱 [GET /api/currency] Usando tasa de respaldo:", fallbackRate)
    return NextResponse.json({ rate: fallbackRate })
  }
}
