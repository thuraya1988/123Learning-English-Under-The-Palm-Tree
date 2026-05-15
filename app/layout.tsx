import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AmbientBackdrop from "../components/AmbientBackdrop";

export const metadata: Metadata = {
  title: "Learn Under The Palm Tree",
  description:
    "A cinematic English-learning journey inspired by stories, skills, music, games, and imagination.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <AmbientBackdrop />
        <Header />
        <main className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-[1480px] mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
