import { getReportById } from "@/src/lib/forensics";
import { Shield, Terminal } from "lucide-react";

export default async function Footer({ id }: { id: string }) {
  const report = await getReportById(id);

  if (!report || !report.exifData?.ifd0) {
    return <div>Erro ao buscar informações</div>;
  }

  return (
    <header className="w-full md:fixed md:bottom-0 px-4 py-2 border-t border-gray-700/50 text-primary font-mono bg-accent">
      <div className="max-w-7xl justify-between flex flex-col gap-5 md:gap-0 md:flex-row items-start md:items-center mx-auto">
        <div className="flex flex-col md:flex-row gap-0.5 md:gap-5 text-sm">
          <div className="uppercase flex items-center gap-2">
            <span className="size-3 bg-green-600 block rounded-full animate-pulse"></span>
            <p>Sistema Ativo</p>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="size-5" />
            <p className="opacity-70">Analise:</p>
            <span className="uppercase">Completa</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="size-5" />
            <p className="opacity-70">Integridade:</p>
            <span className="uppercase">Verificada</span>
          </div>
        </div>
        <div className="flex flex-col md:gap-5 md:flex-row items-center text-sm text-primary">
          <p>MetaLens v1.0 \\ Forense Analysis Engine</p>
        </div>
      </div>
    </header>
  );
}
