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
      <body className="antialiased">
        <AmbientBackdrop />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
