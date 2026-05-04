import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { getReportById } from "@/src/lib/forensics";
import { Terminal } from "lucide-react";
import { Separator } from "@/src/components/ui/separator";

export default async function RawCard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = await getReportById(id);

  if (!report || !report.exifData?.gps) {
    return <div>Sem metadados</div>;
  }
  return (
    <Card className="w-full inset-shadow-sm inset-shadow-foreground/5 shadow-xl/70 shadow-accent p-2 bg-linear-to-br from-accent to-background">
      <CardHeader className="flex items-center gap-4 pt-2">
        <Terminal className="size-6 text-primary" />
        <span className="text-xs font-mono uppercase tracking-wider">RawMetadata.json</span>
      </CardHeader>
      <Separator className="p-0 m-0" />
      <CardContent>
        <pre className="text-sm font-mono text-green-400/90 whitespace-pre-wrap break-all">
          {JSON.stringify(report.exifData, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
}
