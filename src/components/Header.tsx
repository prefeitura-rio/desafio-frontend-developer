import React from "react";
export default function Header() {
    return (
      <header className="bg-[var(--cor-azul-escuro)] text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Qualidade do Ar RJ</h1>
        </div>
      </header>
    );
  }