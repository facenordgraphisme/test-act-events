import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google"; // eslint-disable-line @typescript-eslint/no-unused-vars
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ACT Events | DJ & Sonorisation Hautes-Alpes",
  description: "Location de sonorisation et DJ pour mariages, anniversaires et séminaires dans les Hautes-Alpes (Gap, Briançon, Embrun).",
  icons: {
    icon: "/assets/logos/icon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
