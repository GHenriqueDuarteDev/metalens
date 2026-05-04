"use server";

import exifr from "exifr";
import { db } from "@/src/lib/db";
import { reports } from "@/src/lib/db/schema";

export async function processImageAction(formData: FormData) {
  try {
    const file = formData.get("image") as File | null;

    if (!file) return { error: "Nenhuma imagem foi recebida." };

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    //Forçando o exifr a ler todos os segmentos de metadados conhecidos
    const metadata = await exifr.parse(buffer, {
      exif: true, // Dados da Câmera (Abertura, ISO, Lente)
      gps: true, // Coordenadas geográficas
      xmp: true, // Metadados do Adobe Lightroom/Photoshop
      iptc: true, // Direitos autorais e descrições jornalísticas
      icc: true, // Perfil de cor (Ex: Display P3 da Apple)
      jfif: true, // Resolução base do JPEG
      makerNote: true, // Dados ocultos proprietários (Apple, Samsung, Canon)
      mergeOutput: false, // Mantém os dados separados por categoria para organizar melhor depois
    });

    const cameraModelString = metadata?.ifd0?.Model || metadata?.exif?.Model || null;

    const safeExifData = metadata;

    const [newReport] = await db
      .insert(reports)
      .values({
        cameraModel: cameraModelString,
        exifData: safeExifData,
      })
      .returning({ id: reports.id });

    return {
      success: true,
      reportId: newReport.id,
      rawData: safeExifData,
    };
  } catch (error) {
    console.error("❌ Erro fatal na extração:", error);
    return { error: "Falha ao analisar a imagem. Formato corrompido ou sem suporte." };
  }
}
