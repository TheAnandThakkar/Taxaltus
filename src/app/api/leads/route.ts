import { NextResponse } from "next/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  preferences: z.array(z.string().trim().max(80)).max(8).optional(),
  source: z.string().trim().max(100).optional(),
});

export async function POST(request: Request) {
  try {
    const parsed = leadSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json({ error: "Please enter a valid name and email." }, { status: 400 });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const tableName = process.env.SUPABASE_LEADS_TABLE || "leads";

    if (!supabaseUrl || !serviceRoleKey) {
      console.warn("Supabase lead capture is not configured.", parsed.data);
      return NextResponse.json({ success: true, stored: false });
    }

    const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/${tableName}`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        preferences: parsed.data.preferences || [],
        source: parsed.data.source || "lead_popup",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase lead insert failed:", errorText);
      return NextResponse.json({ error: "Unable to save your details right now." }, { status: 502 });
    }

    return NextResponse.json({ success: true, stored: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json({ error: "Unable to save your details right now." }, { status: 500 });
  }
}
