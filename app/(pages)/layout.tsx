"use client";

import React from "react";
import Navbar from "@/components/Navbar";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="pages-layout">{children}</main>
    </>
  );
}
