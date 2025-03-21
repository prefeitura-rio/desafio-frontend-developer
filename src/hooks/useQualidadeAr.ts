import { useEffect, useState } from "react";

interface QualidadeAr {
  latitude: number;
  longitude: number;
  id: number;
  bairro: string;
  indice: number;
  qualidade: "Bom" | "Moderado" | "Ruim" | "Péssimo";
  atualizado_em: string;
}

export default function useQualidadeAr() {
  const [dados, setDados] = useState<QualidadeAr[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/qualidade-ar");
        if (!response.ok) {
          throw new Error("Erro ao buscar dados");
        }
        const data: QualidadeAr[] = await response.json();
        setDados(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { dados, loading, error };
}