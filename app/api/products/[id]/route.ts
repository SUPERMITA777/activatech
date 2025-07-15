import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .single()

    if (error) throw error
    if (!product) return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product by ID:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("🚀 [PUT /api/products/[id]] Iniciando actualización de producto")
    console.log("🆔 [PUT /api/products/[id]] ID del producto:", params.id)
    const body = await request.json()
    console.log("📦 [PUT /api/products/[id]] Datos recibidos:", JSON.stringify(body, null, 2))

    // Get current USD to ARS rate
    console.log("💱 [PUT /api/products/[id]] Obteniendo tasa de cambio...")
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const currencyResponse = await fetch(`${siteUrl}/api/currency`)
    const { rate } = await currencyResponse.json()
    console.log("💱 [PUT /api/products/[id]] Tasa de cambio:", rate)

    const productData = {
      ...body,
      price_ars: Math.round(body.price_usd * rate),
      updated_at: new Date().toISOString(),
    }
    console.log("📦 [PUT /api/products/[id]] Datos a actualizar:", JSON.stringify(productData, null, 2))

    const { data: product, error } = await supabase
      .from("products")
      .update(productData)
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("❌ [PUT /api/products/[id]] Error de Supabase:", error)
      throw error
    }

    console.log("✅ [PUT /api/products/[id]] Producto actualizado exitosamente:", product)
    return NextResponse.json(product)
  } catch (error) {
    console.error("❌ [PUT /api/products/[id]] Error completo:", error)
    return NextResponse.json({ 
      error: "Failed to update product", 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("🚀 [DELETE /api/products/[id]] Iniciando eliminación de producto")
    console.log("🆔 [DELETE /api/products/[id]] ID del producto:", params.id)

    const { error } = await supabase.from("products").update({ is_active: false }).eq("id", params.id)

    if (error) {
      console.error("❌ [DELETE /api/products/[id]] Error de Supabase:", error)
      throw error
    }

    console.log("✅ [DELETE /api/products/[id]] Producto eliminado exitosamente")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("❌ [DELETE /api/products/[id]] Error completo:", error)
    return NextResponse.json({ 
      error: "Failed to delete product", 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
