import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { getReportById } from "@/src/lib/forensics";
import { Image } from "lucide-react";
import { Separator } from "@/src/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/src/components/ui/table";
import dateFormated from "@/src/lib/formateUtcDate";

function formatExposureTime(value: number) {
  if (!value) return "-";
  const denominator = Math.round(1 / value);
  return `1/${denominator}s`;
}

export default async function CaptureCard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = await getReportById(id);

  const exif = report?.exifData?.exif;

  if (!report || !exif) {
    return <div>Sem dados de captura</div>;
  }

  return (
    <Card className="w-full min-w-3xs max-w-2xl inset-shadow-sm inset-shadow-foreground/5 shadow-xl/70 shadow-accent p-2 bg-linear-to-br from-accent to-background">
      <CardHeader className="flex items-center gap-4 pt-2">
        <Image className="size-6 text-primary" />
        <span className="text-xs font-mono uppercase tracking-wider">Lente / Captura</span>
      </CardHeader>

      <Separator className="p-0 m-0" />

      <CardContent>
        <Table>
          <TableBody className="text-sm font-mono text-green-400/90 whitespace-pre-wrap break-all">
            <TableRow>
              <TableCell className="opacity-70">ISO:</TableCell>
              <TableCell className="text-end">ISO {exif.ISO}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Abertura:</TableCell>
              <TableCell className="text-end">f/{exif.FNumber}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Tempo de exposição:</TableCell>
              <TableCell className="text-end">{formatExposureTime(exif.ExposureTime!)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Compensação:</TableCell>
              <TableCell className="text-end">{exif.ExposureCompensation}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Distância focal:</TableCell>
              <TableCell className="text-end">{exif.FocalLength}mm</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Equivalente 35mm:</TableCell>
              <TableCell className="text-end">{exif.FocalLengthIn35mmFormat}mm</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Abertura máxima:</TableCell>
              <TableCell className="text-end">f/{exif.MaxApertureValue}</TableCell>
            </TableRow>

            {/* ILUMINAÇÃO */}
            <TableRow>
              <TableCell className="opacity-70">Flash:</TableCell>
              <TableCell className="text-end">{exif.Flash}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Balanço de branco:</TableCell>
              <TableCell className="text-end">{exif.WhiteBalance}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Brilho:</TableCell>
              <TableCell className="text-end">{exif.BrightnessValue}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Modo de exposição:</TableCell>
              <TableCell className="text-end">{exif.ExposureMode}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Programa:</TableCell>
              <TableCell className="text-end">{exif.ExposureProgram}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Medição de luz:</TableCell>
              <TableCell className="text-end">{exif.MeteringMode}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Tipo de cena:</TableCell>
              <TableCell className="text-end">{exif.SceneCaptureType}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Data original:</TableCell>
              <TableCell className="text-end">{dateFormated(exif.DateTimeOriginal!)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Resolução:</TableCell>
              <TableCell className="text-end">
                {exif.ExifImageWidth} x {exif.ExifImageHeight}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
