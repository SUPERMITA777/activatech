import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data: contactInfo, error } = await supabase.from("contact_info").select("*").limit(1).single()

    if (error) throw error

    return NextResponse.json(contactInfo)
  } catch (error) {
    console.error("Error fetching contact info:", error)
    return NextResponse.json({ error: "Failed to fetch contact info" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()

    const { data: contactInfo, error } = await supabase
      .from("contact_info")
      .upsert({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(contactInfo)
  } catch (error) {
    console.error("Error updating contact info:", error)
    return NextResponse.json({ error: "Failed to update contact info" }, { status: 500 })
  }
}
