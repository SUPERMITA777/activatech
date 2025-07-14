import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("instagram_posts")
      .select("*")
      .eq("is_visible", true)
      .order("timestamp", { ascending: false })
      .limit(4)

    if (error) throw error
    return NextResponse.json(data ?? [])
  } catch (error: any) {
    // 42P01 → relation does not exist (tabla aún no creada)
    if (error?.code === "42P01") {
      console.warn("[Instagram API] La tabla instagram_posts no existe aún. Devolviendo lista vacía.")
      return NextResponse.json([])
    }

    console.error("Error fetching Instagram posts:", error)
    return NextResponse.json([], { status: 500 })
  }
}
