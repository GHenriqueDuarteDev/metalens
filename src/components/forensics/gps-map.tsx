"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMemo } from "react";

interface MapViewProps {
  lat: number;
  lng: number;
  direction?: number;
}

export default function MapView({ lat, lng, direction }: MapViewProps) {
  const forensicMarker = useMemo(() => {
    const radarCone =
      direction !== undefined
        ? `
      <div class="absolute flex items-center justify-center pointer-events-none" 
           style="width: 120px; height: 120px; transform: rotate(${direction}deg);">
        <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]">
          <!-- M 50 50 (Centro) L 25 6.7 (Esquerda) A 50 50 0 0 1 75 6.7 (Arco Superior) Z (Fecha) -->
          <path d="M 50 50 L 25 6.7 A 50 50 0 0 1 75 6.7 Z" 
                fill="url(#radar-gradient)" 
                stroke="rgba(239, 68, 68, 0.4)" 
                stroke-width="1"/>
          
          <!-- Gradiente para dar efeito de lanterna sumindo -->
          <defs>
            <radialGradient id="radar-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="rgba(239, 68, 68, 0.5)" />
              <stop offset="100%" stop-color="rgba(239, 68, 68, 0)" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    `
        : "";

    return L.divIcon({
      className: "bg-transparent",
      html: `
        <div class="relative flex items-center justify-center w-8 h-8">
          <!-- O Cone de Radar entra aqui por trás -->
          ${radarCone}
          
          <!-- O Ponto Central Original -->
          <div class="absolute w-full h-full bg-primary rounded-full opacity-40 animate-ping"></div>
          <div class="relative z-10 w-3 h-3 bg-primary/80 border border-black rounded-full shadow-[0_0_8px_rgba(220,38,38,1)]"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16], // Garante que o centro da bola e do cone fiquem certos na coordenada
    });
  }, [direction]);

  return (
    <MapContainer center={[lat, lng]} zoom={15} className="w-full h-full z-0" zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[lat, lng]} icon={forensicMarker} />
    </MapContainer>
  );
}
