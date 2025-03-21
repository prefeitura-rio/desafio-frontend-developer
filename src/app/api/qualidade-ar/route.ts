import { NextResponse } from "next/server";

export async function GET() {
  const dadosQualidadeAr = [
    { id: 1, bairro: "Copacabana", indice: 42, qualidade: "Bom", atualizado_em: "2025-03-17T12:00:00Z", latitude: -22.9711, longitude: -43.1822 },
    { id: 2, bairro: "Centro", indice: 85, qualidade: "Moderado", atualizado_em: "2025-03-17T12:00:00Z", latitude: -22.9068, longitude: -43.1729 },
    { id: 3, bairro: "Barra da Tijuca", indice: 120, qualidade: "Ruim", atualizado_em: "2025-03-17T12:00:00Z", latitude: -23.0011, longitude: -43.3659 },
    { id: 4, bairro: "Madureira", indice: 180, qualidade: "Péssimo", atualizado_em: "2025-03-17T12:00:00Z", latitude: -22.8732, longitude: -43.3407 },
    { id: 5, bairro: "Ipanema", indice: 55, qualidade: "Bom", atualizado_em: "2025-03-17T12:00:00Z", latitude: -22.9871, longitude: -43.2048 },
    { id: 6, bairro: "Leblon", indice: 48, qualidade: "Bom", atualizado_em: "2025-03-17T12:00:00Z", latitude: -22.9844, longitude: -43.2226 },
    { id: 7, bairro: "Botafogo", indice: 73, qualidade: "Moderado", atualizado_em: "2025-03-17T12:00:00Z", latitude: -22.9520, longitude: -43.1845 },
    { id: 8, bairro: "Tijuca", indice: 95, qualidade: "Moderado", atualizado_em: "2025-03-17T12:00:00Z", latitude: -22.9234, longitude: -43.2326 },
    { id: 9, bairro: "Santa Teresa", indice: 110, qualidade: "Ruim", atualizado_em: "2025-03-17T12:00:00Z", latitude: -22.9129, longitude: -43.1863 },
    { id: 10, bairro: "Laranjeiras", indice: 50, qualidade: "Bom", atualizado_em: "2025-03-17T12:00:00Z", latitude: -22.9315, longitude: -43.1840 },
    { id: 11, bairro: "São Conrado", indice: 135, qualidade: "Ruim", atualizado_em: "2025-03-17T12:00:00Z", latitude: -23.0007, longitude: -43.2681 },
    { id: 12, bairro: "Recreio dos Bandeirantes", indice: 160, qualidade: "Péssimo", atualizado_em: "2025-03-17T12:00:00Z", latitude: -23.0125, longitude: -43.4766 },
    { id: 13, bairro: "Jacarepaguá", indice: 100, qualidade: "Moderado", atualizado_em: "2025-03-17T12:00:00Z", latitude: -22.9399, longitude: -43.3795 },
    { id: 14, bairro: "Méier", indice: 130, qualidade: "Ruim", atualizado_em: "2025-03-17T12:00:00Z", latitude: -22.9028, longitude: -43.2792 },
    { id: 15, bairro: "Gávea", indice: 62, qualidade: "Bom", atualizado_em: "2025-03-17T12:00:00Z", latitude: -22.9796, longitude: -43.2341 }
  ];

  return NextResponse.json(dadosQualidadeAr);
}