
import React, { JSX } from "react";
import { FaSmile, FaMeh, FaFrown, FaSkull } from "react-icons/fa";

interface QualidadeIconeProps {
  qualidade: "Bom" | "Moderado" | "Ruim" | "Péssimo";
}

export default function QualidadeIcone({ qualidade }: QualidadeIconeProps): JSX.Element | null {
  const icones: Record<QualidadeIconeProps["qualidade"], JSX.Element> = {
    Bom: <FaSmile className="text-green-600 text-2xl" />, 
    Moderado: <FaMeh className="text-yellow-600 text-2xl" />, 
    Ruim: <FaFrown className="text-orange-600 text-2xl" />, 
    Péssimo: <FaSkull className="text-red-600 text-2xl" />
  };

  return icones[qualidade] || null;
}
