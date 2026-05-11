import { returnPayload } from "@/src/types/database";
import { Clock, Shield } from "lucide-react";
import Link from "next/link";

export default async function Header({ report }: { report: returnPayload }) {
  if (!report) return <div>Sem dados</div>;

  return (
    <header className="w-full px-4 py-4 border-b border-gray-700/50 text-primary font-mono bg-accent">
      <div className="max-w-7xl justify-between flex items-center mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="md:size-8" />
          <span className="md:text-3xl font-bold">MetaLens</span>
        </Link>
        <div className="flex flex-col text-sm md:text-base md:gap-5 md:flex-row items-center">
          <p className="flex gap-2">
            <span className="opacity-70">ID:</span> {report.id.slice(0, 5)}...${report.id.slice(-4)}
          </p>
          <div className="flex items-center gap-3">
            <Clock className="size-4 md:size-6" />
            <p>{report.createdAt.toLocaleString("en-Us")}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
