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
    const rawMetadata = await exifr.parse(buffer, {
      exif: true, // Dados da Câmera (Abertura, ISO, Lente)
      gps: true, // Coordenadas geográficas
      xmp: true, // Metadados do Adobe Lightroom/Photoshop
      iptc: true, // Direitos autorais e descrições jornalísticas
      icc: true, // Perfil de cor (Ex: Display P3 da Apple)
      jfif: true, // Resolução base do JPEG
      makerNote: true, // Dados ocultos proprietários (Apple, Samsung, Canon)
      mergeOutput: false, // Mantém os dados separados por categoria para organizar melhor depois
    });

    if (!rawMetadata) {
      throw new Error("Não foi possivel extrair os metadados");
    }

    //essa sanitização e necessaria pois alguns fabricantes adicionam "null bytes" como \u0000 nos campos e o postgreSQL rejeita
    const sanitizedString = JSON.stringify(rawMetadata).replace(/\\u0000/g, "");
    const safeExifData = JSON.parse(sanitizedString);

    const cameraModelString = rawMetadata?.ifd0?.Model || rawMetadata?.exif?.Model || null;

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
