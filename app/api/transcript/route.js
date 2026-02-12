import { NextResponse } from "next/server";

export async function POST(request) {
  const { url } = await request.json();

  if (!url || typeof url !== "string") {
    return NextResponse.json(
      { error: "A valid YouTube URL is required." },
      { status: 400 },
    );
  }

  // TODO: Implement YouTube transcript fetching/parsing.
  // Suggested approach: extract video id, call transcript source, then normalize text.
  const transcript = `Placeholder transcript for URL: ${url}\n\nThis is where the fetched YouTube transcript will be returned.`;

  return NextResponse.json({ transcript });
}
