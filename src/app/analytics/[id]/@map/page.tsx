import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card";
import { getReportById } from "@/src/lib/forensics";
import { MapPin, Navigation } from "lucide-react";
import { Separator } from "@/src/components/ui/separator";
import MapWrapper from "@/src/components/forensics/map-wrapper";

export default async function MapCard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = await getReportById(id);

  const lat = report?.exifData?.gps?.latitude as number | undefined;
  const lng = report?.exifData?.gps?.longitude as number | undefined;
  const direction = report?.exifData?.gps?.GPSImgDirection as number | undefined;

  if (!report || !lat || !lng) {
    return (
      <div className="bg-black border border-green-800 rounded p-4 mb-4 h-64 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
            {[...Array(64)].map((_, i) => (
              <div key={i} className="border border-green-500" />
            ))}
          </div>
        </div>
        <div className="relative z-10 text-center">
          <MapPin className="w-16 h-16 text-green-500 mx-auto mb-2 animate-pulse" />
          <p className="text-green-500 font-mono text-sm">SEM DADOS DE GPS</p>
        </div>
      </div>
    );
  }
  return (
    <Card className="w-full inset-shadow-sm inset-shadow-foreground/5 shadow-xl/70 shadow-accent p-2 bg-linear-to-br from-accent to-background">
      <CardHeader className="flex items-center gap-4 pt-2">
        <Navigation className="size-6 text-primary" />
        <span className="text-xs font-mono uppercase tracking-wider">Local da foto</span>
      </CardHeader>
      <Separator className="p-0 m-0" />
      <CardContent>
        <div className="relative flex-1 h-64 w-full rounded-2xl overflow-hidden">
          <MapWrapper lat={lat} lng={lng} direction={direction} />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4 font-mono text-xs text-gray-400">
            <span>
              LAT: <span className="text-white">{lat.toFixed(6)}</span>
            </span>
            <span>
              LNG: <span className="text-white">{lng.toFixed(6)}</span>
            </span>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-primary hover:text-white transition-colors"
          >
            [ ABRIR NO G.MAPS ]
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
