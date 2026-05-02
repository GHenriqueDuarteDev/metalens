export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col bg-background text-foreground items-center justify-center min-h-screen p-4 md:p-8">
      {children}
    </main>
  );
}
