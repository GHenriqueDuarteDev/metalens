"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const forensicMarker = L.divIcon({
  className: "bg-transparent",
  html: `<div class="relative flex items-center justify-center w-8 h-8">
           <!-- O pulso animado (Ping) -->
           <div class="absolute w-full h-full bg-red-500 rounded-full opacity-40 animate-ping"></div>
           <!-- O ponto central sólido -->
           <div class="relative w-3 h-3 bg-red-600 border border-black rounded-full shadow-primary"></div>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16], // Centraliza exatamente em cima da coordenada
});

interface MapViewProps {
  lat: number;
  lng: number;
}

export default function MapView({ lat, lng }: MapViewProps) {
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
