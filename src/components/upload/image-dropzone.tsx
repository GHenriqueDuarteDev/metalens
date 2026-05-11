"use client";

import exifr from "exifr";
import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { UploadCloud, Loader2, AlertTriangle } from "lucide-react";
import { processImageAction } from "@/src/actions/process-image";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export default function ImageDropzone() {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setErrorMessage(null);
      const file = acceptedFiles[0];
      if (!file) return;

      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      try {
        const rawMetadata = await exifr.parse(file, {
          exif: true, // Dados da Câmera (Abertura, ISO, Lente)
          gps: true, // Coordenadas geográficas
          xmp: true, // Metadados do Adobe Lightroom/Photoshop
          iptc: true, // Direitos autorais e descrições jornalísticas
          icc: true, // Perfil de cor (Ex: Display P3 da Apple)
          jfif: true, // Resolução base do JPEG
          makerNote: true, // Dados ocultos proprietários (Apple, Samsung, Canon)
          mergeOutput: false, // Mantém os dados separados por categoria para organizar melhor depois
        });
        const response = await processImageAction(rawMetadata, file.name);

        if (response.error) {
          setErrorMessage(response.error);
          setIsUploading(false);
        } else if (response.rawData) {
          router.push(`/analytics/${response.reportId}`);
        }
      } catch {
        setErrorMessage("Erro de conexão ao analisar a imagem.");
      } finally {
        setIsUploading(false);
      }
    },
    [router]
  );

  // Intercepta arquivos muito grandes ou com formatos errados na hora!
  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const { errors } = fileRejections[0];
    if (errors[0].code === "file-too-large") {
      setErrorMessage(`A imagem excede o limite máximo de 50MB.`);
    } else if (errors[0].code === "file-invalid-type") {
      setErrorMessage("Formato inválido. Por favor, envie arquivos JPEG ou PNG.");
    } else {
      setErrorMessage("Não foi possível aceitar este arquivo.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      //Adicionar WebP e HEIC no futuro se necessário
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    disabled: isUploading,
  });

  return (
    <div className="flex flex-1 flex-col items-center w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`relative flex flex-1 flex-col items-center justify-center w-full min-h-64 p-12 transition-all border-2 border-dashed rounded-xl cursor-pointer bg-card text-card-foreground
          ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50"}
          ${isUploading ? "opacity-50 pointer-events-none" : ""}
          ${errorMessage ? "border-destructive/50 bg-destructive/5" : ""}
        `}
      >
        <input {...getInputProps()} />

        {isUploading ? (
          <Loader2 className="w-12 h-12 mb-4 text-primary animate-spin" />
        ) : (
          <UploadCloud
            className={`w-12 h-12 mb-4 transition-colors ${isDragActive ? "text-primary" : errorMessage ? "text-destructive" : "text-muted-foreground"}`}
          />
        )}

        <p className="text-lg font-medium text-center font-sans">
          {isUploading
            ? "Processando metadados no servidor..."
            : isDragActive
              ? "Solte a imagem para iniciar a extração"
              : "Arraste uma imagem ou clique para selecionar"}
        </p>

        <p className="mt-2 text-sm text-center text-muted-foreground font-mono">
          Suporta JPEG e PNG (Max: 50MB).
        </p>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-4 mt-4 text-sm font-medium border rounded-md text-destructive border-destructive/20 bg-destructive/10">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
