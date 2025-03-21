
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Home from "../components/Home";

vi.mock("@/hooks/useQualidadeAr", () => ({
  default: () => ({
    dados: [
      {
        id: 1,
        bairro: "Copacabana",
        indice: 45,
        qualidade: "Bom",
        atualizado_em: "2024-03-17T10:00:00Z",
        latitude: -22.9711,
        longitude: -43.1822,
      },
      {
        id: 2,
        bairro: "Ipanema",
        indice: 70,
        qualidade: "Ruim",
        atualizado_em: "2024-03-17T10:00:00Z",
        latitude: -22.9871,
        longitude: -43.2048,
      },
    ],
    loading: false,
    error: null,
  }),
}));

describe("Painel de Qualidade do Ar", () => {
  test("renderiza o título corretamente", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /Painel de Qualidade do Ar/i })).toBeInTheDocument();
  });

  test("renderiza os filtros corretamente", () => {
    render(<Home />);
    expect(screen.getAllByRole("combobox").length).toBeGreaterThan(0);
  });

  test("alterna entre visualização de tabela e mapa", () => {
    render(<Home />);
    const botaoAlternar = screen.getByRole("button", { name: /Visualizar Mapa/i });
    fireEvent.click(botaoAlternar);
    expect(screen.getByRole("button", { name: /Visualizar Tabela/i })).toBeInTheDocument();
    fireEvent.click(botaoAlternar);
    expect(screen.getByRole("button", { name: /Visualizar Mapa/i })).toBeInTheDocument();
  });

  test("abre e fecha o modal ao clicar em um bairro na tabela", async () => {
    render(<Home />);
    const linhas = screen.getAllByRole("row");
    fireEvent.click(linhas[1]);
    expect(screen.getByText(/Detalhes do Bairro/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Fechar/i));
    await waitFor(() => {
      expect(screen.queryByText(/Detalhes do Bairro/i)).not.toBeInTheDocument();
    });
  });

  test("executa corretamente o filtro por bairro", () => {
    render(<Home />);
    const selectBairro = screen.getByLabelText(/Todos os bairros/i);
    fireEvent.change(selectBairro, { target: { value: "Copacabana" } });
    expect(screen.getByRole("cell", { name: "Copacabana" })).toBeInTheDocument();
    expect(screen.queryByRole("cell", { name: "Ipanema" })).not.toBeInTheDocument();
  });

  test("exibe mensagem de erro quando a API retorna um erro", async () => {
    vi.resetModules();
    vi.doMock("@/hooks/useQualidadeAr", () => ({
      default: () => ({
        dados: [],
        loading: false,
        error: "Erro ao buscar dados",
      }),
    }));

    const { default: HomeErro } = await import("../components/Home");
    render(<HomeErro />);
    expect(await screen.findByText(/Erro ao buscar dados/i)).toBeInTheDocument();
  });
});
