import "./css/fonts.css";
import "./css/foundation-base.css";
import "./css/solar-system.css";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Solar System",
  description: "Revamp from old code to include modern libraries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
