import Footer from "@/src/components/ui/footer";
import Header from "@/src/components/ui/header";

export default async function AnalyticsLayout({
  hardware,
  map,
  capture,
  raw,
  children,
  params,
}: Readonly<{
  hardware: React.ReactNode;
  map: React.ReactNode;
  capture: React.ReactNode;
  raw: React.ReactNode;
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  return (
    <>
      <Header id={id} />
      <main className="bg-background md:mb-7 grid grid-cols-1 md:grid-cols-2 gap-5 border-x max-w-7xl h-full mx-auto border-gray-700/50 text-foreground min-h-screen p-4 md:p-8">
        <div className="flex flex-col gap-5">
          {hardware}
          {map}
        </div>
        <div className="flex flex-col gap-5">
          {capture}
          {raw}
          {children}
        </div>
      </main>
      <Footer id={id} />
    </>
  );
}
