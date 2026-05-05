import { ExifDataPayload } from "@/src/types/database";

export interface IntegrityReport {
  status: "VERIFICADA" | "PROCESSADA" | "COMPROMETIDA";
  reasons: string[];
}

export function analyzeIntegrity(metadata?: ExifDataPayload): IntegrityReport {
  let score = 0;
  const hasPhotoshopKey = !!metadata?.photoshop;
  const hasMakerNotes = !!metadata?.makerNote;
  const history = Array.isArray(metadata?.xmpMM?.History) ? metadata.xmpMM.History : [];

  // 1. Verificação de Software
  if (hasPhotoshopKey) score += 15;

  // 2. Verificação de Histórico (Crucial para PROCESSADA)
  if (history.length > 0) {
    score += 20;
    // Se o histórico for muito longo, indica muitas sessões de edição
    if (history.length > 2) score += 20;
  }

  // 3. Dados de Hardware
  // Se o software for Adobe mas os dados de hardware (MakerNotes) ainda existem,
  // reduzimos a chance de ser "Comprometida" e puxamos para "Processada"
  if (hasMakerNotes && score > 0) {
    score -= 10;
  }

  if (score === 0)
    return {
      status: "VERIFICADA",
      reasons: [
        "Os metadados originais parecem intactos. Nenhum traço de edição ou processamento detectado.",
      ],
    };
  if (score > 0 && score <= 30)
    return {
      status: "PROCESSADA",
      reasons: [
        "A imagem possui metadados XMP, indicando que foi Exportada/Renomeada, mas com dados de hardware preservados",
      ],
    };
  return {
    status: "COMPROMETIDA",
    reasons: [
      `Indícios de edição detectados. A pontuação na escala de confiabilidade(0 a 50) atingiu: "${score}"`,
    ],
  };
}
