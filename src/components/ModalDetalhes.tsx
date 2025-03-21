import React from "react";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi"; 
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
  Dot,
} from "recharts";

interface ModalDetalhesProps {
  bairro: string;
  indice: number;
  qualidade: "Bom" | "Moderado" | "Ruim" | "Péssimo";
  atualizadoEm: string;
  onClose: () => void;
}

const gerarDadosHistoricos = (indiceAtual: number) => {
  return Array.from({ length: 7 }).map((_, i) => ({
    dia: `Dia ${i + 1}`,
    indice: Math.max(10, indiceAtual + (Math.random() * 20 - 10)), 
  }));
};

const definirCorPonto = (indice: number) => {
  if (indice <= 50) return "#22c55e"; 
  if (indice <= 100) return "#eab308"; 
  if (indice <= 150) return "#f97316"; 
  return "#ef4444"; 
};

export default function ModalDetalhes({
  bairro,
  indice,
  qualidade,
  atualizadoEm,
  onClose,
}: ModalDetalhesProps) {
  const dadosHistoricos = gerarDadosHistoricos(indice);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const verificarTela = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    verificarTela();
    window.addEventListener("resize", verificarTela);
    return () => window.removeEventListener("resize", verificarTela);
  }, []);

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      aria-labelledby="titulo-modal"
      role="dialog"
      aria-modal="true"
      onClick={handleBackgroundClick}
    >
      <div
        className={`bg-white p-4 rounded-lg shadow-lg ${
          isMobile ? "w-[90%] max-w-md" : "w-full max-w-lg"
        } max-h-[90vh] overflow-y-auto animate-fadeIn`}
      >
        <div className="flex justify-between items-center border-b pb-2">
           <h2 id="titulo-modal" className="text-lg md:text-2xl font-bold text-[var(--cor-azul-escuro)]">
             Detalhes do Bairro
           </h2>
           <button
             onClick={onClose}
             className="text-red-600 hover:text-red-700 transition text-2xl p-2 rounded-full hover:bg-gray-200 cursor-pointer"
             aria-label="Fechar modal"
           >
             <FiX className="w-6 h-6" />
           </button>
         </div>
        <div className="mt-4">
          <p className="text-sm md:text-lg"><strong>Bairro:</strong> {bairro}</p>
          <p className="text-sm md:text-lg"><strong>Índice:</strong> {indice}</p>
          <p
            className={`text-sm md:text-lg font-bold ${
              qualidade === "Bom"
                ? "text-green-600"
                : qualidade === "Moderado"
                ? "text-yellow-600"
                : qualidade === "Ruim"
                ? "text-orange-600"
                : "text-red-600"
            }`}
          >
            <strong>Qualidade:</strong> {qualidade}
          </p>
          <p className="text-xs md:text-sm text-gray-600 mt-2">
            Última atualização: {new Date(atualizadoEm).toLocaleString()}
          </p>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-[var(--cor-azul-escuro)] mb-2">Histórico de Qualidade do Ar</h3>
          <ResponsiveContainer width="100%" height={isMobile ? 150 : 180}>
            <LineChart data={dadosHistoricos}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="dia" />
              <YAxis label={{ value: "Índice", angle: -90, position: "insideLeft" }} />
              <Tooltip formatter={(value) => [`Índice: ${value}`, "Qualidade"]} />

              <ReferenceLine y={100} label="Alerta" stroke="#ef4444" strokeDasharray="4 4" />

              <Line
                type="monotone"
                dataKey="indice"
                stroke="#2974E0"
                strokeWidth={2}
                dot={({ cx, cy, payload, index  }) => (
                  <Dot  key={index} cx={cx} cy={cy} r={4} fill={definirCorPonto(payload.indice)} />
                )}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <button
          onClick={onClose}
          className="mt-2 md:mt-4 px-3 md:px-4 py-1 md:py-2 bg-[var(--cor-botao-primario)] text-white rounded hover:bg-[var(--cor-botao-secundario)] w-full transition cursor-pointer"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}