import CaptureCard from "@/src/components/forensics/capture-card";
import HardwareCard from "@/src/components/forensics/hardware-card";
import MapCard from "@/src/components/forensics/map-card";
import RawCard from "@/src/components/forensics/raw-json-card";
import Footer from "@/src/components/ui/footer";
import Header from "@/src/components/ui/header";
import { getReportById } from "@/src/lib/forensics";

export default async function AnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const report = await getReportById(id);

  if (!report) return <div>Relatório não encontrado (404)</div>;
  return (
    <>
      <Header report={report} />
      <div className="md:mb-7 grid grid-cols-1 md:grid-cols-2 gap-5 border-x max-w-7xl h-full mx-auto border-gray-700/50 text-foreground min-h-screen p-4 md:p-8">
        <div className="flex flex-col gap-5">
          <HardwareCard report={report} />
          <MapCard report={report} />
        </div>
        <div className="flex flex-col gap-5">
          <CaptureCard report={report} />
          <RawCard report={report} />
        </div>
      </div>
      <Footer report={report} />
    </>
  );
}
