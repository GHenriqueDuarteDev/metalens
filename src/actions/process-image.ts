"use server";

import exifr from "exifr";

export async function processImageAction(formData: FormData) {
  try {
    const file = formData.get("image") as File | null;

    if (!file) return { error: "Nenhuma imagem foi recebida." };

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`🔍 Extração Total (God Mode) em: ${file.name}`);

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

    const gpsData = metadata?.gps;

    console.log("🚀 --- RESULTADO DA EXTRAÇÃO RICA ---");

    if (metadata) {
      console.log("Segmentos detectados:", Object.keys(metadata));

      const cameraInfo = metadata.ifd0 || metadata.exif;
      console.log("📷 Aparelho:", cameraInfo?.Make, cameraInfo?.Model);

      if (metadata.xmp) {
        console.log("🚨 Rastro de Edição Encontrado (XMP):", metadata.xmp?.CreatorTool || "Sim");
      }
    }

    if (gpsData) {
      console.log("📍 GPS Localizado:", `Lat: ${gpsData.latitude}, Long: ${gpsData.longitude}`);
    }
    console.log("-----------------------------------");

    return {
      success: true,
      summary: {
        model: metadata?.ifd0?.Model || metadata?.exif?.Model || "Desconhecido",
        hasGps: !!gpsData,
        date: metadata?.exif?.DateTimeOriginal
          ? new Date(metadata.exif.DateTimeOriginal).toLocaleDateString("pt-BR")
          : "Desconhecida",
      },
    };
  } catch (error) {
    console.error("❌ Erro fatal na extração:", error);
    return { error: "Falha ao analisar a imagem. Formato corrompido ou sem suporte." };
  }
}
