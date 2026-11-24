# Grupo Fox Del Service

Website institucional em Next.js, React e TypeScript, preparado para exportação estática. O conteúdo público centraliza os canais comerciais e evita publicar dados jurídicos ou endereços ainda pendentes de confirmação.

## Requisitos

- Node.js 20.9 ou superior.
- npm.

## Instalar e executar

Execute npm install e depois npm run dev. O servidor fica disponível em http://localhost:3000.

## Verificar e gerar o site

Execute npm run typecheck, npm run lint e npm run build.

Com output: export, o build gera o site estático em out/. Publique o conteúdo dessa pasta em uma hospedagem estática com HTTPS. Não há backend, banco de dados ou armazenamento dos dados digitados no formulário.

## WhatsApp e contato

Os dados comerciais ficam centralizados em src/config/business.ts. O formulário prepara a solicitação e abre wa.me depois que a pessoa revisa e confirma a ação. A mensagem não é enviada automaticamente; a pessoa conclui o envio no WhatsApp.

Confirme com a empresa que os canais comerciais listados continuam ativos antes do lançamento. Não inclua contatos alternativos sem confirmação.

## Serviços e conteúdo

Os serviços em destaque ficam em src/config/business.ts e src/components/fox-site.tsx; os segmentos e as perguntas frequentes também são editados no componente da página. A disponibilidade e o escopo comercial precisam ser confirmados antes da publicação oficial.

Dados jurídicos e endereços pendentes de confirmação não fazem parte do conteúdo nem dos arquivos publicados neste repositório. Confirme essas informações diretamente com a empresa antes de acrescentá-las ao site.

## Atualizar fotografias

Os derivados WebP usados pela página ficam em public/images/. Os arquivos de origem e capturas dos sites de referência são materiais locais e não fazem parte do repositório público. Para recriar os derivados, obtenha autorização para as imagens e coloque em assets/source-images/ os arquivos aprovados indicados em IMAGE_SOURCES.md, então execute npm run optimize:images.

Revise direitos de uso, autorização das pessoas identificáveis, marcas de terceiros e informações internas antes de substituir ou acrescentar fotografias.

## SEO e domínio

O domínio oficial ainda não foi informado. Antes da publicação, defina NEXT_PUBLIC_SITE_URL com o domínio aprovado e NEXT_PUBLIC_SITE_INDEXABLE=true. Sem essas configurações, a exportação não define canonical, não indexa páginas e mantém o sitemap sem URLs. Consulte DEPLOYMENT.md.

## Pendências comerciais e cadastrais

Use o checklist BUSINESS_VALIDATION.md antes de liberar o site oficial. Os dados jurídicos, a cobertura regional, o portfólio atual e o uso final das fotografias precisam ser validados pela empresa.