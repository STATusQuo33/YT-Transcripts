# YT-Transcripts

A Next.js (App Router) starter app for fetching and cleaning YouTube transcripts.

## Features

- Homepage with:
  - YouTube URL input
  - **Get Transcript** button
  - **Clean/Rewrite** button
  - Raw Transcript textarea
  - Cleaned Transcript textarea
- `POST /api/transcript` route (currently stubbed with placeholder transcript + TODO comments)
- `POST /api/clean` route that uses OpenAI Responses API to clean transcript text

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables:

   ```bash
   cp .env.example .env
   ```

   Then update `.env` with your real `OPENAI_API_KEY`.

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

## API routes

### `POST /api/transcript`

Request body:

```json
{ "url": "https://www.youtube.com/watch?v=..." }
```

Response body:

```json
{ "transcript": "..." }
```

> Note: This endpoint is intentionally a stub for now.

### `POST /api/clean`

Request body:

```json
{ "transcript": "..." }
```

Response body:

```json
{ "cleaned": "..." }
```
