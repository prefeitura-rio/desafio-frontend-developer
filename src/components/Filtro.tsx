import React from "react";

interface FiltroProps {
  label: string;
  valorSelecionado: string;
  opcoes: string[];
  onChange: (valor: string) => void;
}

export default function Filtro({ label, valorSelecionado, opcoes, onChange }: FiltroProps) {
  return (
    <select
      value={valorSelecionado}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border border-gray-300 rounded w-full md:w-auto cursor-pointer"
      aria-label={label}
    >
      <option value="">{label}</option>
      {opcoes.map((opcao) => (
        <option key={opcao} value={opcao}>{opcao}</option>
      ))}
    </select>
  );
}