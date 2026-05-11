import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";

export default function AnalyticsLoadind() {
  return (
    <>
      <Skeleton className="min-h-17 w-full px-4 py-4 border-b border-gray-700/50 text-primary font-mono bg-accent" />
      <div className="md:mb-7 grid grid-cols-1 md:grid-cols-2 gap-5 border-x max-w-7xl h-full mx-auto border-gray-700/50 text-foreground min-h-screen p-4 md:p-8">
        <div className="flex flex-col gap-5">
          <Card className="w-full">
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="aspect-video w-full" />
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="aspect-video w-full" />
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-5">
          <Card className="w-full">
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="aspect-video w-full" />
            </CardContent>
          </Card>{" "}
          <Card className="w-full">
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="aspect-video w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
      <Skeleton className="min-h-11 w-full md:fixed md:bottom-0 px-4 py-2 border-t border-gray-700/50 text-primary font-mono bg-accent" />
    </>
  );
}
