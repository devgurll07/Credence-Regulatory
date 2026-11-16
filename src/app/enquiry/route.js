import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();

  if (!data.name || !data.email || !data.phone || !data.service) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  console.log("New enquiry:", data);

  return NextResponse.json({ success: true });
}