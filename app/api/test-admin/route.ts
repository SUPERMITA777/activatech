import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    // Probar acceso a storage con permisos de admin
    const { data: buckets, error: bucketsError } = await supabaseAdmin.storage.listBuckets()
    
    if (bucketsError) {
      return NextResponse.json({ 
        error: "Error accediendo a storage con admin", 
        details: bucketsError.message 
      }, { status: 500 })
    }

    // Probar acceso a la tabla products
    const { data: products, error: productsError } = await supabaseAdmin
      .from("products")
      .select("id, name")
      .limit(1)

    if (productsError) {
      return NextResponse.json({ 
        error: "Error accediendo a products con admin", 
        details: productsError.message 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Service Role Key funcionando correctamente",
      buckets: buckets.map(b => b.name),
      productsCount: products?.length || 0
    })
  } catch (error) {
    console.error("Error en test-admin:", error)
    return NextResponse.json({ 
      error: "Error en test-admin", 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
} 