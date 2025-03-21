
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import '@testing-library/jest-dom';
import Filtro from "../components/Filtro";

describe("Componente Filtro", () => {
  const opcoes = ["Copacabana", "Ipanema", "Centro"];

  test("renderiza com o label correto", () => {
    render(
      <Filtro
        label="Todos os bairros"
        valorSelecionado=""
        opcoes={opcoes}
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText(/Todos os bairros/i)).toBeInTheDocument();
  });

  test("chama onChange com valor correto ao selecionar", () => {
    const handleChange = vi.fn();

    render(
      <Filtro
        label="Todos os bairros"
        valorSelecionado=""
        opcoes={opcoes}
        onChange={handleChange}
      />
    );

    fireEvent.change(screen.getByLabelText(/Todos os bairros/i), {
      target: { value: "Centro" },
    });

    expect(handleChange).toHaveBeenCalledWith("Centro");
  });
});
