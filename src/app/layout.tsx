import React from "react";
import type { Metadata } from "next";
import "./globals.css"; 

export const metadata: Metadata = {
  title: "Painel de Qualidade do Ar",
  description: "Visualização da qualidade do ar por bairro",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
