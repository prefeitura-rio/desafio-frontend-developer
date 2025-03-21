"use client";

import React, { useState } from "react";
import { FaMap, FaTable } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import useQualidadeAr from "../hooks/useQualidadeAr";
import ModalDetalhes from "./ModalDetalhes";
import Tabela from "./Tabela";
import Filtro from "./Filtro";
import Header from "./Header";
import Footer from "./Footer";
import dynamic from "next/dynamic";

const Mapa = dynamic(() => import("./Mapa"), {
  ssr: false,
});

interface QualidadeAr {
  id: number;
  bairro: string;
  indice: number;
  qualidade: "Bom" | "Moderado" | "Ruim" | "Péssimo";
  atualizado_em: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const { dados, loading, error } = useQualidadeAr();
  const [bairroSelecionado, setBairroSelecionado] = useState<string>("");
  const [qualidadeSelecionada, setQualidadeSelecionada] = useState<string>("");
  const [modalAberto, setModalAberto] = useState(false);
  const [bairroDetalhes, setBairroDetalhes] = useState<QualidadeAr | null>(null);
  const [exibirTabela, setExibirTabela] = useState(true);

  const bairros = [...new Set(dados.map((item) => item.bairro))];
  const qualidades = ["Bom", "Moderado", "Ruim", "Péssimo"];

  const dadosFiltrados = dados.filter(
    (item) =>
      (bairroSelecionado === "" || item.bairro === bairroSelecionado) &&
      (qualidadeSelecionada === "" || item.qualidade === qualidadeSelecionada)
  );

  function handleSelecionarBairro(bairro: QualidadeAr) {
    setBairroDetalhes(bairro);
    setModalAberto(true);
  }

  function limparFiltros() {
    setBairroSelecionado("");
    setQualidadeSelecionada("");
  }

  return (
    <div className="flex flex-col min-h-screen bg-[var(--cor-fundo)] text-[var(--cor-cinza-texto)] font-sans">
      <Header />
      <main className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold text-[var(--cor-azul-escuro)] mb-6">
          Painel de Qualidade do Ar
        </h1>

        {loading && <p className="text-gray-500 text-lg">Carregando dados...</p>}
        {error && <p className="text-red-500 text-lg">Erro: {error}</p>}

        {!loading && !error && (
          <>
            <div className="flex flex-wrap gap-4 justify-center w-full">
              <Filtro label="Todos os bairros" valorSelecionado={bairroSelecionado} opcoes={bairros} onChange={setBairroSelecionado} />
              <Filtro label="Todas as qualidades" valorSelecionado={qualidadeSelecionada} opcoes={qualidades} onChange={setQualidadeSelecionada} />

              <div className="flex flex-wrap gap-1">
                <button
                  onClick={limparFiltros}
                  className="flex items-center gap-1 bg-[var(--cor-botao-secundario)] text-white px-4 py-2 rounded hover:bg-[var(--cor-botao-primario)] transition cursor-pointer"
                  aria-label="Limpar filtros"
                >
                  <IoMdCloseCircle className="text-lg" />
                  Limpar Filtros
                </button>

                <button
                  onClick={() => setExibirTabela(!exibirTabela)}
                  className="flex items-center gap-1 bg-[var(--cor-botao-primario)] text-white px-4 py-2 rounded hover:bg-[var(--cor-botao-secundario)] transition cursor-pointer"
                  aria-label={exibirTabela ? "Visualizar Mapa" : "Visualizar Tabela"}
                >
                  {exibirTabela ? <FaMap className="text-lg" /> : <FaTable className="text-lg" />}
                  {exibirTabela ? "Visualizar Mapa" : "Visualizar Tabela"}
                </button>
              </div>
            </div>

            {exibirTabela ? (
              <Tabela dados={dadosFiltrados} onBairroSelecionado={handleSelecionarBairro} />
            ) : (
              <Mapa dados={dadosFiltrados} onBairroSelecionado={handleSelecionarBairro} />
            )}
          </>
        )}

        {modalAberto && bairroDetalhes && (
          <ModalDetalhes
            bairro={bairroDetalhes.bairro}
            indice={bairroDetalhes.indice}
            qualidade={bairroDetalhes.qualidade}
            atualizadoEm={bairroDetalhes.atualizado_em}
            onClose={() => setModalAberto(false)}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}