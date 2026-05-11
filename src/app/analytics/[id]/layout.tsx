export default function AnalyticsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-background border-gray-700/50 text-foreground min-h-screen">
      {children}
    </main>
  );
}
