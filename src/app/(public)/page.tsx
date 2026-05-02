import ImageDropzone from "@/src/components/upload/image-dropzone";
import { Shield, Scan, FileSearch } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="w-full max-w-6xl rounded-2xl shadow-2xl shadow-red-950/50 overflow-hidden border border-gray-700 text-primary-foreground font-mono bg-background">
      <div className="grid md:grid-cols-2 gap-0 min-h-150">
        {/* Seção Esquerda - Informações */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-linear-to-br from-red-900 to-95% text-white border-b md:border-b-0 md:border-r border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-10 h-10" />
            <h1 className="text-4xl font-bold">MetaLens</h1>
          </div>

          <p className="text-xl mb-8 text-primary-foreground">
            Análise Forense de Imagens e Metadados
          </p>

          <p className="text-base mb-8 text-blue-50/80 leading-relaxed">
            Plataforma avançada para análise profunda de imagens, extração de metadados e
            investigação forense digital. Descubra informações ocultas em suas imagens com
            tecnologia de ponta.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Scan className="w-6 h-6 mt-1 shrink-0 text-red-400" />
              <div>
                <h3 className="font-semibold mb-1">Análise Completa</h3>
                <p className="text-sm text-gray-300">
                  Extração de EXIF, IPTC, XMP e metadados ocultos
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileSearch className="w-6 h-6 mt-1 shrink-0 text-red-400" />
              <div>
                <h3 className="font-semibold mb-1">Investigação Forense</h3>
                <p className="text-sm text-gray-300">
                  Detecção de manipulações e alterações em imagens
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 mt-1 shrink-0 text-red-400" />
              <div>
                <h3 className="font-semibold mb-1">Segurança e Privacidade</h3>
                <p className="text-sm text-gray-300">
                  Suas imagens são processadas com segurança total
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seção Direita - Upload */}
        <div className="p-8 md:p-12 flex flex-col">
          <h2 className="text-2xl font-semibold mb-6 text-primary-foreground">Envie sua imagem</h2>

          {/* Container temporário para o futuro Dropzone/Input */}

          <ImageDropzone />
        </div>
      </div>
    </div>
  );
}
