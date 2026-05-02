"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Loader2 } from "lucide-react";
import { processImageAction } from "@/src/actions/process-image";

export default function ImageDropzone() {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);

    // Empacota o arquivo no formato que o servidor entende
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Chama a Server Action diretamente!
      const response = await processImageAction(formData);

      if (response.error) {
        alert(response.error);
      } else {
        alert(`Sucesso! ID gerado: ${response.fakeId}`);
      }
    } catch (error) {
      alert("Erro ao enviar a imagem.");
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    disabled: isUploading,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative flex flex-col items-center justify-center w-full h-full max-w-2xl p-12 mx-auto mt-10 transition-all border-2 border-dashed rounded-xl cursor-pointer bg-card text-card-foreground
        ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50"}
        ${isUploading ? "opacity-50 pointer-events-none" : ""}
      `}
    >
      <input {...getInputProps()} />

      {isUploading ? (
        <Loader2 className="w-12 h-12 mb-4 text-primary animate-spin" />
      ) : (
        <UploadCloud
          className={`w-12 h-12 mb-4 transition-colors ${isDragActive ? "text-primary" : "text-muted-foreground"}`}
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
        Suporta JPEG e PNG de câmeras e smartphones de até 10MB.
      </p>
    </div>
  );
}
