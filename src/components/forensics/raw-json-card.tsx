import { Card, CardContent, CardHeader } from "@/src/components/ui/card";

import { Terminal } from "lucide-react";
import { Separator } from "@/src/components/ui/separator";
import { RawCopyButton } from "@/src/components/forensics/row-copy-text";
import { returnPayload } from "@/src/types/database";

export default async function RawCard({ report }: { report: returnPayload }) {
  const exifData = report.exifData;

  if (!report || !exifData) {
    return <div>Sem metadados</div>;
  }

  const jsonText = JSON.stringify(report.exifData, null, 2);

  return (
    <Card className="w-full inset-shadow-sm inset-shadow-foreground/5 shadow-xl/70 shadow-accent p-2 bg-linear-to-br from-accent to-background">
      <CardHeader className="flex items-center gap-4 pt-2">
        <Terminal className="size-6 text-primary" />
        <span className="text-xs font-mono uppercase tracking-wider">RawMetadata.json</span>
        <RawCopyButton text={jsonText} />
      </CardHeader>
      <Separator className="p-0 m-0" />
      <CardContent>
        <pre
          className="text-sm font-mono bg-background p-5 rounded-2xl text-green-400/90 whitespace-pre-wrap break-all scroll-smooth overflow-auto max-h-[calc(100vh-250px)] overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          {jsonText}
        </pre>
      </CardContent>
    </Card>
  );
}
