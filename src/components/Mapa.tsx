"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
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

interface MapaProps {
  dados: QualidadeAr[];
  onBairroSelecionado: (bairro: QualidadeAr) => void;
}

export default function Mapa({ dados, onBairroSelecionado }: MapaProps) {
  return (
    <div className="w-full overflow-x-auto p-2">
    <MapContainer center={[-22.9068, -43.1729]} zoom={12} className="fixed h-[500px] w-full rounded-lg shadow-md">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {dados.map((bairro) => (
        <Marker
          key={bairro.id}
          position={[bairro.latitude, bairro.longitude]}
          icon={defaultIcon}
          eventHandlers={{ click: () => onBairroSelecionado(bairro) }}
        >
          <Popup>
            <div className="text-center bg-[var(--cor-azul-escuro)] text-white p-2 rounded-t">
              <h3 className="font-bold">{bairro.bairro}</h3>
            </div>
            <div className="p-2">
              <p>Índice: {bairro.indice}</p>
              <p className={`font-bold ${
                  bairro.qualidade === "Bom" ? "text-green-600" :
                  bairro.qualidade === "Moderado" ? "text-yellow-600" :
                  bairro.qualidade === "Ruim" ? "text-orange-600" : "text-red-600"
                }`}>
                Qualidade: {bairro.qualidade}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    </div>
  );
}