import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://type.fit/api/quotes");

    if (!response.ok) {
      throw new Error("Failed to fetch quotes");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json({ error: "Failed to fetch quotes" }, { status: 500 });
  }
}
