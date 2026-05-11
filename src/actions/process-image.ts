"use server";

import { db } from "@/src/lib/db";
import { reports } from "@/src/lib/db/schema";

export async function processImageAction(rawMetadata: Record<string, unknown>, name: string) {
  try {
    if (!rawMetadata || typeof rawMetadata !== "object") {
      throw new Error("Metadados inválidos ou ausentes.");
    }

    //essa sanitização e necessaria pois alguns fabricantes adicionam "null bytes" como \u0000 nos campos e o postgreSQL rejeita
    const sanitizedString = JSON.stringify(rawMetadata).replace(/\\u0000/g, "");
    const safeExifData = JSON.parse(sanitizedString);

    const cameraModelString = safeExifData?.ifd0?.Model || safeExifData?.exif?.Model || null;

    const [newReport] = await db
      .insert(reports)
      .values({
        cameraModel: cameraModelString,
        exifData: safeExifData,
        archiveName: name,
      })
      .returning({ id: reports.id });

    return {
      success: true,
      reportId: newReport.id,
      rawData: safeExifData,
    };
  } catch (error) {
    console.error("❌ Erro ao processar payload de metadados:", error);
    return { error: "Falha ao registrar a análise. Os dados podem estar corrompidos." };
  }
}
