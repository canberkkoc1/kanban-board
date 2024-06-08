import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";

const poppins = Poppins({
  subsets:["latin"],
  weight: ["400","500", "600","700"],
  variable:'--font-poppins'
})

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "A simple Kanban board built with Next.js and Tailwind CSS.",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={poppins.variable}>
            {children}
          </body>
      </html>
  );
}