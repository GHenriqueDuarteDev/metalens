import { getReportById } from "@/src/lib/forensics";
import { Clock, Shield } from "lucide-react";
import Link from "next/link";

export default async function Header({ id }: { id: string }) {
  const report = await getReportById(id);

  if (!report || !report.exifData?.ifd0) {
    return <div>Erro ao buscar informações</div>;
  }

  return (
    <header className="w-full px-4 py-4 border-b border-gray-700/50 text-primary-foreground font-mono bg-accent">
      <div className="max-w-7xl justify-between flex items-center mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="md:size-8" />
          <span className="md:text-3xl font-bold">MetaLens</span>
        </Link>
        <div className="flex flex-col text-sm md:text-base md:gap-5 md:flex-row items-center text-primary">
          <p className="flex gap-2">
            <span className="opacity-70">ID:</span> {id.slice(0, 5)}...${id.slice(-4)}
          </p>
          <div className="flex gap-3">
            <Clock />
            <p>{report.createdAt.toLocaleString("en-Us")}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
