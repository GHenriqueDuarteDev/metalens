metalens/
├── src/
│ ├── actions/ # ⚙️ Mutações no Servidor (Server Actions)
│ │ ├── process-image.ts # Recebe imagem, roda o 'exifr' no buffer, salva no DB
│ │ └── claim-reports.ts # Lê o cookie de visitante e atrela análises ao user logado
│ │
│ ├── app/ # 🌐 App Router
│ │ ├── (public)/ # Route Group: Páginas abertas
│ │ │ ├── page.tsx # A Landing Page com o Dropzone gigante
│ │ │ └── layout.tsx # Header com botão "Entrar"
│ │ │
│ │ ├── analise/[id]/ # O Dashboard Dinâmico (Acessível via Link)
│ │ │ ├── layout.tsx # Orquestra os cards usando Slots (CSS Grid)
│ │ │ ├── @header/page.tsx # Título, modelo da câmera e botões de compartilhamento
│ │ │ ├── @hardware/page.tsx # Card visual com ícones (Abertura, ISO, Lente)
│ │ │ ├── @mapa/page.tsx # Slot condicional para o mapa (Leaflet)
│ │ │ ├── @raw/page.tsx # Accordion/Lista com os dados técnicos brutos
│ │ │ ├── page.tsx # Fallback
│ │ │ ├── loading.tsx # Skeletons dos cards para transição suave
│ │ │ └── opengraph-image.tsx# Desenha a miniatura do WhatsApp dinamicamente
│ │ │
│ │ ├── (protected)/ # Route Group: Exige autenticação
│ │ │ └── dashboard/ # Galeria privada do usuário
│ │ │ └── page.tsx # Lista todos os relatórios do user_id
│ │ │
│ │ ├── api/ # Route Handlers
│ │ │ └── auth/
│ │ │ └── [...nextauth]/route.ts # Motor do NextAuth (Google/GitHub/Credentials)
│ │ │
│ │ ├── globals.css # Tailwind e Dark Mode
│ │ └── layout.tsx # Root Layout (Providers e Fontes)
│ │
│ ├── components/ # 🧩 O Lego da Interface
│ │ ├── ui/ # shadcn/ui (Cards, Buttons, Dialogs)
│ │ ├── upload/ # Dropzone com Drag & Drop (Client Component)
│ │ └── forensics/ # Componentes de domínio
│ │ ├── hardware-card.tsx # Card estilizado com Lucide Icons
│ │ └── gps-map.tsx # Renderização do mapa
│ │
│ ├── lib/ # 🛠️ O Motor de Engenharia
│ │ ├── db/ # Drizzle ORM
│ │ │ ├── schema.ts # Definição das tabelas Users e Reports (com JSONB)
│ │ │ └── index.ts # Conexão com o PostgreSQL
│ │ ├── auth.ts # Configurações do NextAuth e Callbacks
│ │ ├── forensics.ts # Funções que chamam o 'exifr' isoladas das Actions
│ │ └── utils.ts # Utilitários (tradutor de chaves do EXIF, formatadores)
│ │
│ └── types/ # 🏷️ TypeScript Estrito
│ └── database.d.ts # Tipagem da coluna JSONB para ajudar no Front-end
│
├── middleware.ts # 🛡️ Edge Middleware (Protege rotas do painel privado)
├── tailwind.config.ts # Cores (Carvão e Laranja) e Tipografia
└── drizzle.config.ts # Configuração das migrations do ORM

==================================================================================================================================

Aqui está o seu roadmap passo a passo para desenvolver o MetaLens, focado em pequenas vitórias que mantêm a motivação em alta:

Fase 1: Fundação e Design System (A Preparação) ✅
Antes de lidar com dados, o ambiente precisa existir. ✅

Setup do Next.js: Inicializar o projeto com App Router, TypeScript e Tailwind CSS. ✅

Configuração de UI: Instalar o shadcn/ui, configurar o tema escuro (Dark Mode) como padrão nativo e adicionar as fontes monoespaçadas. ✅

Setup do Banco: Configurar o Drizzle ORM e conectar ao PostgreSQL do Supabase. Criar as tabelas Users e Reports (com a famosa coluna JSONB), e rodar a primeira migration para deixar o banco pronto, mesmo que não vá usá-lo imediatamente. ✅

Fase 2: O Motor Core (Upload e Extração) ✅
Aqui você prova que o Next.js consegue processar arquivos de forma elegante.

O Front do Upload: Criar o componente visual do Dropzone na página inicial (onde o usuário arrasta a foto). ✅

A Server Action (Fake): Criar a ação que recebe o FormData. Num primeiro momento, apenas imprima no terminal do servidor (console.log) para confirmar que o arquivo chegou inteiro. ✅

O Cérebro (exifr): Integrar a biblioteca exifr. Passar o buffer da imagem para ela e conseguir extrair o objeto JSON com os metadados brutos. ✅

A Ponte: Conectar a Server Action ao Drizzle para que o JSON extraído seja salvo na tabela Reports do PostgreSQL, gerando o UUID.

Fase 3: O Dashboard Dinâmico (A Vitrine)
Com os dados chegando no banco, é hora de dar vida aos cards e ícones que você escolheu.

A Rota Dinâmica: Criar a estrutura de pastas app/analise/[id]/page.tsx. Fazer a página ler o ID da URL e buscar o JSON correspondente no PostgreSQL.

O Tratamento do JSON: Criar as funções de utilidade que pegam o JSON caótico e o separam em categorias (Câmera, Localização, Configurações Técnicas).

A Interface de Cards: Construir os componentes visuais. Um card com ícone de satélite para o GPS, um card com ícone de lente para o hardware.

Empty States: Programar os cards para sumirem ou mostrarem mensagens amigáveis ("Dados não encontrados") caso a foto não tenha aquela informação específica.

Fase 4: Compartilhamento e Otimização (A UX Avançada)
O projeto já funciona, agora vamos deixá-lo com cara de produção.

Rotas Paralelas e Loading: Refatorar a rota de análise usando o Suspense e loading.tsx para que a tela não congele enquanto o servidor busca os dados.

A Magia do Link: Garantir que qualquer pessoa que acesse a URL analise/[uuid] veja os dados (o fluxo de Guest Mode).

Geração do Open Graph: Criar o arquivo opengraph-image.tsx para ler o banco e desenhar dinamicamente aquele "card" de preview para o WhatsApp e Slack.

Fase 5: Autenticação e Vínculo (A Regra de Negócio)
É aqui que você adiciona a camada de produto (o upsell).

NextAuth (Auth.js): Configurar o login (pode ser com Google/GitHub para facilitar a vida do usuário).

A Lógica do Cookie: Implementar a lógica de salvar o UUID no navegador do usuário visitante.

O Vínculo: Criar a funcionalidade que, no momento do login ou cadastro, varre os UUIDs salvos no cookie e atualiza a coluna user_id no banco de dados, transferindo a posse dos relatórios.

Área Protegada: Criar uma rota /dashboard privada onde o usuário vê uma galeria com todo o seu histórico de análises.

Fase 6: Segurança e Refinamento (O Polimento Sênior)
Edge Middleware: Criar o middleware.ts para implementar proteção de rotas (redirecionar se não estiver logado no dashboard) e um rate limit simples para evitar spam no upload.

Limpeza (Cleanup): Garantir que a extração não está deixando rastros de memória e fazer os últimos testes de performance.

Esta é a trilha de desenvolvimento que isola a complexidade, permitindo que você valide o projeto etapa por etapa.
