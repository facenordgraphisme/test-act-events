import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google"; // eslint-disable-line @typescript-eslint/no-unused-vars
import "./globals.css";

import { CookieBanner } from "@/components/ui/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ACT Event | DJ, Sonorisation & Éclairage Hautes-Alpes & PACA",
  description: "Expert en événementiel dans les Hautes-Alpes et en région PACA. Location de sonorisation, éclairage et DJ professionnel pour mariages, séminaires et soirées privées à Gap, Briançon et Embrun.",
  keywords: ["DJ Hautes-Alpes", "Sonorisation Gap", "Mariage Hautes-Alpes", "Événementiel PACA", "Location sono Briançon", "DJ Provence-Alpes-Côte d'Azur"],
  icons: {
    icon: "/assets/logos/icon.webp",
  },
  verification: {
    google: "41vUk_4VoD9SSBhrPZhitR3jbWfxCoHi6p0qYZYLug0",
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
        <CookieBanner />
      </body>
    </html>
  );
}
