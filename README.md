# 🛡️ MetaLens — Digital Forensics Analysis Engine

O **MetaLens** é uma plataforma avançada de perícia digital focada na extração, análise e auditoria de metadados de imagens. O sistema permite que investigadores e entusiastas analisem a "certidão de nascimento" de arquivos fotográficos, identificando origens, coordenadas geográficas e possíveis manipulações de integridade.

## 🚀 Tecnologias Utilizadas

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router & Server Actions)
- **Estilização:** Tailwind CSS + Shadcn/UI
- **Banco de Dados:** PostgreSQL via [Supabase](https://supabase.com/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Mapas:** [Leaflet.js](https://leafletjs.org/) (com React-Leaflet)
- **Extração de Dados:** [Exifr](https://github.com/MikeKroz/exifr)
- **Gerenciador de Pacotes:** pnpm

## 🔍 Funcionalidades Implementadas

### 1. Extração Forense Profunda (Sem Persistência Física)

Processamento em memória de arquivos JPEG/PNG. As imagens são analisadas no servidor e descartadas imediatamente. Nenhum arquivo de mídia é salvo em Buckets, garantindo total privacidade.

- **EXIF:** Dados de hardware, configurações de lente e exposição.
- **XMP:** Metadados extensíveis, incluindo histórico de edição da Adobe.
- **IPTC:** Informações editoriais e de copyright.
- **MakerNotes:** Assinaturas proprietárias de fabricantes (Apple, Samsung, Google, etc).

### 2. Motor de Integridade (Audit Log)

Algoritmo avançado de auditoria (Deep Scan) que analisa todo o payload binário para classificar a imagem em três níveis:

- ✅ **VERIFICADA:** Arquivo original direto da câmera, sem alterações ou anomalias temporais.
- 🟡 **PROCESSADA / CATALOGADA:** Pixels originais preservados, mas metadados catalogados ou renomeados (ex: agências de notícias ou transferência via WhatsApp).
- 🔴 **COMPROMETIDA:** Detecção de manipulação gráfica via Adobe Photoshop, Camera Raw ou inconsistências graves nas assinaturas de `Software` e `ModifyDate`.

### 3. Mapeamento Geoespacial Avançado

Interface de mapa tático (Dark Mode) baseada nas coordenadas GPS extraídas:

- **Ponto de Captura:** Indicador visual piscante na coordenada exata.
- **Radar de Visão (Field of View):** Se a imagem contiver os graus do magnetômetro (`GPSImgDirection`), o mapa exibe um cone direcional indicando precisamente para onde a câmera estava apontada.

### 4. Arquitetura e Automação

- **Arquitetura Componentizada:** Layout estruturado com componentes de servidor rápidos, evitando o uso desnecessário de Rotas Paralelas para consumos de dados oriundos da mesma tabela.
- **Limpeza Automática (CRON):** Integração nativa com `pg_cron` no Supabase para gerenciar a política de retenção, deletando relatórios não listados automaticamente.

## 🛠️ Como Rodar Localmente

### Pré-requisitos

- Node.js 20+
- pnpm instalado (`npm install -g pnpm`)
- Uma instância do Supabase (ou banco PostgreSQL equivalente)

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/metalens.git](https://github.com/seu-usuario/metalens.git)
   cd metalens
   ```
2. **Instalar dependências:**
   ```bash
   pnpm install
   ```
3. **Configurar variáveis de ambiente:**

   Crie um arquivo .env na raiz do projeto com as seguintes chaves (substitua pelos seus dados):

   ```bash
   DATABASE_URL="postgres://postgres.seu_projeto:senha@aws-0-sa-east-1.pooler.supabase.com:6543/postgres"
   ```

4. **Sincronizar o Banco de Dados (Drizzle):**

   ```bash
   pnpm drizzle-kit push
   ```

5. **Executar em modo desenvolvimento:**

   ```bash
   pnpm dev
   ```

### ⚙️ Configuração Adicional: Limpeza de Dados no Supabase

Para evitar acúmulo de dados temporários no banco, configure a rotina de exclusão diretamente no SQL Editor do Supabase:

```bash
CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.schedule(
         'limpeza_relatorios_unlisted',
         '0 3 * * *', -- Executa diariamente às 03:00 da manhã
         $$
             DELETE FROM reports
             WHERE visibility = 'unlisted'
             AND created_at <= NOW() - INTERVAL '7 days';
         $$
     );
```

### 📁 Estrutura de Pastas (Core)

- `src/actions:` Lógica server-side para upload em memória, higienização do JSON (remoção de Null Bytes) e inserção no DB.

- `src/app/analytics/[id]:` Rota mestre de análise que distribui o payload do banco para os componentes.

- `src/components/forensics:` Widgets de visualização (Mapa com Leaflet, Cards de Hardware e JSON raw).

- `src/lib/integrity.ts:` Utilitário forense com a inteligência de validação de edições (O "Cérebro" da plataforma).
