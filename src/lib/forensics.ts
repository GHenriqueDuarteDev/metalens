import { db } from "@/src/lib/db";
import { reports } from "./db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getReportById = cache(async (id: string) => {
  const result = await db.select().from(reports).where(eq(reports.id, id));
  return result[0];
});
