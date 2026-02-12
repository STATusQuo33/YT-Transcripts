import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { transcript } = await request.json();

  if (!transcript || typeof transcript !== "string") {
    return NextResponse.json(
      { error: "Transcript text is required." },
      { status: 400 },
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY environment variable." },
      { status: 500 },
    );
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: [
        {
          role: "system",
          content:
            "You clean up transcripts by fixing grammar, punctuation, and readability while preserving meaning.",
        },
        {
          role: "user",
          content: `Clean and rewrite this transcript for readability:\n\n${transcript}`,
        },
      ],
    });

    const cleaned = response.output_text?.trim();

    if (!cleaned) {
      return NextResponse.json(
        { error: "No cleaned output was returned by the model." },
        { status: 502 },
      );
    }

    return NextResponse.json({ cleaned });
  } catch (error) {
    console.error("OpenAI clean error:", error);
    return NextResponse.json(
      { error: "Failed to clean transcript." },
      { status: 500 },
    );
  }
}
