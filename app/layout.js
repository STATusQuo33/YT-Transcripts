export const metadata = {
  title: "YT-Transcripts",
  description: "Fetch and clean YouTube transcripts",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
