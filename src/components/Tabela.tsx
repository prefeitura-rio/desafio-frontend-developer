import React, { useState } from "react";
import QualidadeIcone from "./QualidadeIcone";
import { FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface QualidadeAr {
  id: number;
  bairro: string;
  indice: number;
  qualidade: "Bom" | "Moderado" | "Ruim" | "Péssimo";
  atualizado_em: string;
  latitude: number;
  longitude: number;
}

interface TabelaProps {
  dados: QualidadeAr[];
  onBairroSelecionado: (bairro: QualidadeAr) => void;
}

export default function Tabela({ dados, onBairroSelecionado }: TabelaProps) {
  const [paginaAtual, setPaginaAtual] = useState(0);
  const itensPorPagina = 5;

  const totalPaginas = Math.ceil(dados.length / itensPorPagina);
  const dadosPaginados = dados.slice(paginaAtual * itensPorPagina, (paginaAtual + 1) * itensPorPagina);

  return (
    <div className="w-full overflow-x-auto p-2">
      <table className="w-full min-w-[600px] bg-white border border-gray-300 shadow-lg rounded-lg">
        <thead className="bg-[var(--cor-azul-escuro)] text-white">
          <tr>
            <th className="p-3 text-left">Bairro</th>
            <th className="p-3 text-left">Índice</th>
            <th className="p-3 text-left">Qualidade</th>
            <th className="p-3 text-left">Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {dadosPaginados.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 hover:bg-gray-100 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--cor-azul-escuro)]"
              onClick={() => onBairroSelecionado(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onBairroSelecionado(item);
                }
              }}
              tabIndex={0}
            >
              <td className="p-3">{item.bairro}</td>
              <td className="p-3">{item.indice}</td>
              <td className="p-3 flex items-center gap-2 font-bold">
                <QualidadeIcone qualidade={item.qualidade} />
                {item.qualidade}
              </td>
              <td className="p-3 text-center">
                <button
                  onClick={() => onBairroSelecionado(item)}
                  className="focus:outline-none focus:ring-2 focus:ring-[var(--cor-azul-escuro)] rounded p-1"
                  aria-label={`Ver detalhes do bairro ${item.bairro}`}
                >
                  <FaEye className="text-[var(--cor-azul-escuro)] text-lg cursor-pointer hover:scale-110 transition" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 0))}
          disabled={paginaAtual === 0}
          className={`px-4 py-2 rounded ${
            paginaAtual === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-[var(--cor-botao-primario)] text-white hover:bg-[var(--cor-botao-secundario)] cursor-pointer"
          } focus:outline-none focus:ring-2 focus:ring-[var(--cor-azul-escuro)]`}
          aria-label="Página anterior"
        >
          <FaChevronLeft />
        </button>

        <span className="text-lg font-semibold">
          Página {paginaAtual + 1} de {totalPaginas}
        </span>

        <button
          onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas - 1))}
          disabled={paginaAtual === totalPaginas - 1}
          className={`px-4 py-2 rounded ${
            paginaAtual === totalPaginas - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[var(--cor-botao-primario)] text-white hover:bg-[var(--cor-botao-secundario)] cursor-pointer"
          } focus:outline-none focus:ring-2 focus:ring-[var(--cor-azul-escuro)]`}
          aria-label="Próxima página"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}