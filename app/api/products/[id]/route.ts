import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { data: product, error } = await supabase
      .from("products")
      .update(productData)
      .eq("id", params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase.from("products").update({ is_active: false }).eq("id", params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
