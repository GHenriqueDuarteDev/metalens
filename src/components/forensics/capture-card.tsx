import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import { Separator } from "@/src/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/src/components/ui/table";
import dateFormated from "@/src/lib/formateUtcDate";
import { returnPayload } from "@/src/types/database";

function formatExposureTime(value: number) {
  if (!value) return "-";
  const denominator = Math.round(1 / value);
  return `1/${denominator}s`;
}

export default async function CaptureCard({ report }: { report: returnPayload }) {
  if (!report) return <div>Sem dados</div>;

  const exif = report?.exifData?.exif;

  return (
    <Card className="w-full min-w-3xs max-w-2xl inset-shadow-sm inset-shadow-foreground/5 shadow-xl/70 shadow-accent p-2 bg-linear-to-br from-accent to-background">
      <CardHeader className="flex items-center gap-4 pt-2">
        <ImageIcon className="size-6 text-primary" />
        <span className="text-xs font-mono uppercase tracking-wider">Lente / Captura</span>
      </CardHeader>

      <Separator className="p-0 m-0" />

      <CardContent>
        <Table>
          <TableBody className="text-sm font-mono text-green-400/90 whitespace-pre-wrap break-all">
            <TableRow>
              <TableCell className="opacity-70">ISO:</TableCell>
              <TableCell className="text-end">
                {exif?.ISO ? `ISO ${exif.ISO}` : "Sem metadados."}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Abertura:</TableCell>
              <TableCell className="text-end">
                {exif?.FNumber ? `f/${exif.FNumber}` : "Sem metadados."}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Tempo de exposição:</TableCell>
              <TableCell className="text-end">
                {exif?.ExposureTime ? formatExposureTime(exif.ExposureTime) : "Sem metadados."}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Compensação:</TableCell>
              <TableCell className="text-end">
                {exif?.ExposureCompensation || "Sem metadados."}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Distância focal:</TableCell>
              <TableCell className="text-end">
                {exif?.FocalLength ? `${exif.FocalLength}mm` : "Sem metadados."}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Equivalente 35mm:</TableCell>
              <TableCell className="text-end">
                {exif?.FocalLengthIn35mmFormat
                  ? `${exif.FocalLengthIn35mmFormat}mm`
                  : "Sem metadados."}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Abertura máxima:</TableCell>
              <TableCell className="text-end">
                {exif?.MaxApertureValue ? `f/${exif.MaxApertureValue}` : "Sem metadados."}
              </TableCell>
            </TableRow>

            {/* ILUMINAÇÃO */}
            <TableRow>
              <TableCell className="opacity-70">Flash:</TableCell>
              <TableCell className="text-end">{exif?.Flash || "Sem metadados."}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Balanço de branco:</TableCell>
              <TableCell className="text-end">{exif?.WhiteBalance || "Sem metadados."}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Brilho:</TableCell>
              <TableCell className="text-end">
                {exif?.BrightnessValue || "Sem metadados."}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Modo de exposição:</TableCell>
              <TableCell className="text-end">{exif?.ExposureMode || "Sem metadados."}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Programa:</TableCell>
              <TableCell className="text-end">
                {exif?.ExposureProgram || "Sem metadados."}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Medição de luz:</TableCell>
              <TableCell className="text-end">{exif?.MeteringMode || "Sem metadados."}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Tipo de cena:</TableCell>
              <TableCell className="text-end">
                {exif?.SceneCaptureType || "Sem metadados."}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Data original:</TableCell>
              <TableCell className="text-end">
                {exif?.DateTimeOriginal ? dateFormated(exif.DateTimeOriginal) : "Sem metadados."}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="opacity-70">Resolução:</TableCell>
              <TableCell className="text-end">
                {exif?.ExifImageWidth && exif.ExifImageHeight
                  ? `${exif.ExifImageWidth} x ${exif.ExifImageHeight}`
                  : "Sem metadados."}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
