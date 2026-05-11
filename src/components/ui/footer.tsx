import { analyzeIntegrity } from "@/src/lib/integrity";
import { returnPayload } from "@/src/types/database";
import { Shield, Terminal } from "lucide-react";

export default async function Footer({ report }: { report: returnPayload }) {
  if (!report) return <div>Sem dados</div>;

  const integrity = analyzeIntegrity(report?.exifData);

  return (
    <header className="w-full md:fixed md:bottom-0 px-4 py-2 border-t border-gray-700/50 text-primary font-mono bg-accent">
      <div className="max-w-7xl justify-between flex flex-col gap-2 md:gap-0 md:flex-row items-start md:items-center mx-auto">
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
          <div className="flex flex-col md:flex-row items-start md:items-center md:gap-2">
            <div className="flex gap-2">
              <Shield className="size-5" />
              <p className="opacity-70">Integridade:</p>
            </div>
            <span className="flex items-center gap-2">
              {integrity.status === "COMPROMETIDA" ? (
                <span
                  className="text-primary border border-red-500/30 px-2 py-0.5 rounded bg-red-500/10 cursor-help"
                  title={integrity.reasons.join(" | ")}
                >
                  COMPROMETIDA (Edição Detectada)
                </span>
              ) : integrity.status === "PROCESSADA" ? (
                <span
                  className="text-yellow-500 border border-yellow-500/30 px-2 py-0.5 rounded bg-red-yellow/10 cursor-help"
                  title={integrity.reasons.join(" | ")}
                >
                  PROCESSADA (Renomeada/Catalogada)
                </span>
              ) : (
                <span className="text-green-500 border border-green-500/30 px-2 py-0.5 rounded bg-green-500/10">
                  {report.exifData?.ifd0 ? "VERIFICADA (Original)" : "INDETERMINADO"}
                </span>
              )}
            </span>
          </div>
        </div>
        <div className="flex flex-col md:gap-5 md:flex-row items-center text-sm text-primary">
          <p>MetaLens v1.0 \\ Forense Analysis Engine</p>
        </div>
      </div>
    </header>
  );
}
