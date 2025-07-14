import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    // Try to get cached rate first
    const { data: cachedRate } = await supabase
      .from("currency_rates")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single()

    // Check if rate is less than 1 hour old
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
    if (cachedRate && new Date(cachedRate.updated_at) > oneHourAgo) {
      return NextResponse.json({ rate: cachedRate.usd_to_ars })
    }

    // Try to fetch fresh rate from multiple sources
    let rate = cachedRate?.usd_to_ars || 1000

    try {
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
      }
    } catch (error) {
      console.log("Primary API failed, trying backup...")

      try {
        // Backup API - dolarapi.com
        const backupResponse = await fetch("https://dolarapi.com/v1/dolares/blue", {
          next: { revalidate: 3600 },
        })

        if (backupResponse.ok) {
          const backupData = await backupResponse.json()
          rate = Number.parseFloat(backupData.venta) || rate
        }
      } catch (backupError) {
        console.log("Backup API also failed, using cached rate")
      }
    }

    // Update database with new rate
    await supabase.from("currency_rates").upsert({
      usd_to_ars: rate,
      source: "dolarhoy.com",
      updated_at: new Date().toISOString(),
    })

    return NextResponse.json({ rate })
  } catch (error) {
    console.error("Error fetching currency rate:", error)

    // Return cached rate or fallback
    const { data: cachedRate } = await supabase
      .from("currency_rates")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single()

    return NextResponse.json({ rate: cachedRate?.usd_to_ars || 1000 })
  }
}
