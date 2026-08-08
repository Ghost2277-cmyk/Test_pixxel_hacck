import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { AppPreloader } from "@/components/ui/AppPreloader";
import { RewardModal } from "@/components/ui/RewardModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SYLVA-eCO LIFE | Heal the Planet. One Habit at a Time.",
  description: "Transform sustainable living into an AI-powered journey where every eco-friendly action heals a living digital Earth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ backgroundColor: '#020617', color: '#ffffff' }}>
        <AuthProvider>
          <ThemeProvider>
            <AppPreloader>
              {children}
              <RewardModal />
            </AppPreloader>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
