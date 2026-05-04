import { getReportById } from "@/src/lib/forensics";
import { Clock, Shield } from "lucide-react";

export default async function Header({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = await getReportById(id);

  if (!report || !report.exifData?.ifd0) {
    return <div>Sem dados de horário</div>;
  }

  return (
    <header className="w-full px-4 py-4 border-b border-gray-700/50 text-primary-foreground font-mono bg-accent">
      <div className="max-w-7xl justify-between flex items-center mx-auto">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8" />
          <h1 className="text-3xl font-bold">MetaLens</h1>
        </div>
        <div className="flex flex-col md:gap-5 md:flex-row items-center text-primary">
          <p className="flex gap-2">
            <span className="opacity-70">ID:</span> {id.slice(0, 5)}...${id.slice(-4)}
          </p>
          <div className="flex gap-3">
            <Clock />
            <p>{report.createdAt.toLocaleString("pt-Br")}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
