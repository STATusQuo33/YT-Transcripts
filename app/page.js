"use client";

import { useState } from "react";

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [rawTranscript, setRawTranscript] = useState("");
  const [cleanedTranscript, setCleanedTranscript] = useState("");
  const [loadingTranscript, setLoadingTranscript] = useState(false);
  const [loadingClean, setLoadingClean] = useState(false);
  const [error, setError] = useState("");

  const getTranscript = async () => {
    setError("");
    setLoadingTranscript(true);

    try {
      const response = await fetch("/api/transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transcript.");
      }

      const data = await response.json();
      setRawTranscript(data.transcript ?? "");
      setCleanedTranscript("");
    } catch (err) {
      setError(err.message || "Unexpected error.");
    } finally {
      setLoadingTranscript(false);
    }
  };

  const cleanTranscript = async () => {
    setError("");
    setLoadingClean(true);

    try {
      const response = await fetch("/api/clean", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: rawTranscript }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Failed to clean transcript.");
      }

      const data = await response.json();
      setCleanedTranscript(data.cleaned ?? "");
    } catch (err) {
      setError(err.message || "Unexpected error.");
    } finally {
      setLoadingClean(false);
    }
  };

  return (
    <main>
      <h1>YT-Transcripts</h1>

      <div>
        <label htmlFor="youtube-url">YouTube URL</label>
        <input
          id="youtube-url"
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>

      <div className="controls">
        <button
          className="primary"
          onClick={getTranscript}
          disabled={loadingTranscript || !url}
        >
          {loadingTranscript ? "Loading..." : "Get Transcript"}
        </button>
        <button
          className="secondary"
          onClick={cleanTranscript}
          disabled={loadingClean || !rawTranscript}
        >
          {loadingClean ? "Cleaning..." : "Clean/Rewrite"}
        </button>
      </div>

      {error ? <p className="error">{error}</p> : null}

      <div className="grid">
        <div>
          <label htmlFor="raw-transcript">Raw Transcript</label>
          <textarea
            id="raw-transcript"
            value={rawTranscript}
            onChange={(event) => setRawTranscript(event.target.value)}
            placeholder="Transcript from YouTube will appear here"
          />
        </div>

        <div>
          <label htmlFor="cleaned-transcript">Cleaned Transcript</label>
          <textarea
            id="cleaned-transcript"
            value={cleanedTranscript}
            onChange={(event) => setCleanedTranscript(event.target.value)}
            placeholder="Cleaned transcript will appear here"
          />
        </div>
      </div>
    </main>
  );
}
