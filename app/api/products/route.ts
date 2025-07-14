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
    const body = await request.json()

    // Get current USD to ARS rate
    const currencyResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/currency`)
    const { rate } = await currencyResponse.json()

    const productData = {
      ...body,
      price_ars: Math.round(body.price_usd * rate),
      updated_at: new Date().toISOString(),
    }

    const { data: product, error } = await supabase.from("products").insert(productData).select().single()

    if (error) throw error

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
