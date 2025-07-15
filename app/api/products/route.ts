import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) throw error
    return NextResponse.json(products ?? [])
  } catch (error: any) {
    // 42P01 = la relación no existe   (tabla sin crear)
    if (error?.code === "42P01") {
      console.warn("[Products API] Tabla 'products' aún no existe. Devolviendo lista vacía.")
      return NextResponse.json([])
    }

    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 [POST /api/products] Iniciando creación de producto")
    const body = await request.json()
    console.log("📦 [POST /api/products] Datos recibidos:", JSON.stringify(body, null, 2))

    // Get current USD to ARS rate
    console.log("💱 [POST /api/products] Obteniendo tasa de cambio...")
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const currencyResponse = await fetch(`${siteUrl}/api/currency`)
    const { rate } = await currencyResponse.json()
    console.log("💱 [POST /api/products] Tasa de cambio:", rate)

    const productData = {
      ...body,
      price_ars: Math.round(body.price_usd * rate),
      updated_at: new Date().toISOString(),
    }
    console.log("📦 [POST /api/products] Datos a insertar:", JSON.stringify(productData, null, 2))

    const { data: product, error } = await supabase.from("products").insert(productData).select().single()

    if (error) {
      console.error("❌ [POST /api/products] Error de Supabase:", error)
      throw error
    }

    console.log("✅ [POST /api/products] Producto creado exitosamente:", product)
    return NextResponse.json(product)
  } catch (error) {
    console.error("❌ [POST /api/products] Error completo:", error)
    return NextResponse.json({ 
      error: "Failed to create product", 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
