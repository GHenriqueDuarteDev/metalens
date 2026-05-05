import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { getReportById } from "@/src/lib/forensics";
import { Camera } from "lucide-react";
import { Separator } from "@/src/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/src/components/ui/table";
import dateFormated from "@/src/lib/formateUtcDate";

export default async function HardwareCard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = await getReportById(id);

  const ifd0 = report.exifData.ifd0;

  if (!report || !ifd0) {
    return <div>Sem dados de camera</div>;
  }
  return (
    <Card className="w-full min-w-3xs max-w-2xl inset-shadow-sm inset-shadow-foreground/5 shadow-xl/70 shadow-accent p-2 bg-linear-to-br from-accent to-background">
      <CardHeader className="flex items-center gap-4 pt-2">
        <Camera className="size-6 text-primary" />
        <span className="text-xs font-mono uppercase tracking-wider">Dados da câmera</span>
      </CardHeader>
      <Separator className="p-0 m-0" />
      <CardContent>
        <Table>
          <TableBody className="text-sm font-mono text-green-400/90 whitespace-pre-wrap break-all">
            <TableRow className="font-medium font-mono">
              <TableCell className="opacity-70">Fabricante:</TableCell>
              <TableCell className="text-end">{ifd0.Make}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="opacity-70">Modelo:</TableCell>
              <TableCell className="text-end">{ifd0.Model}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="opacity-70">Data da captura:</TableCell>
              <TableCell className="text-end">{dateFormated(ifd0.ModifyDate!)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="opacity-70">Posição:</TableCell>
              <TableCell className="text-end">{ifd0.Orientation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="opacity-70">Largura da imagem:</TableCell>
              <TableCell className="text-end">{ifd0.ImageWidth}px</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="opacity-70">Altura da imagem:</TableCell>
              <TableCell className="text-end">{ifd0.ImageHeight}px</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="opacity-70">Modelo:</TableCell>
              <TableCell className="text-end">{ifd0.Model}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
