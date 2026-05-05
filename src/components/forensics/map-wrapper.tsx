"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const LeafletMap = dynamic(() => import("./gps-map"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#0f0f0f] text-gray-500 font-mono text-xs">
      <Loader2 className="w-5 h-5 mb-2 animate-spin text-primary" />
      <span>[ ESTABELECENDO CONEXÃO DE SATÉLITE... ]</span>
    </div>
  ),
});

interface MapWrapperProps {
  lat: number;
  lng: number;
  direction?: number;
}

export default function MapWrapper({ lat, lng, direction }: MapWrapperProps) {
  return <LeafletMap lat={lat} lng={lng} direction={direction} />;
}
