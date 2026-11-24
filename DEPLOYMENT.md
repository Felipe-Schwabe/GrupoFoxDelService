# Publicação estática

## Saída do build

O projeto usa Next.js App Router com `output: "export"`. `npm run build` gera HTML, CSS, JavaScript e imagens na pasta `out/`. O site não requer servidor de aplicação, banco de dados, API ou chave de serviço. A hospedagem precisa servir arquivos estáticos e oferecer HTTPS.

## Antes do build oficial

1. Concluir e registrar as aprovações de [BUSINESS_VALIDATION.md](./BUSINESS_VALIDATION.md).
2. Definir o domínio oficial somente depois da aprovação da empresa.
3. Criar variáveis no ambiente de build:

```text
NEXT_PUBLIC_SITE_URL=https://DOMINIO-APROVADO
NEXT_PUBLIC_SITE_INDEXABLE=true
```

4. Executar `npm ci`, `npm run typecheck`, `npm run lint` e `npm run build`.
5. Publicar somente a pasta `out/`. A pasta `assets/source-images/` é material de origem para manutenção e não deve ser copiada para a raiz pública.
6. Configurar domínio e registros DNS conforme as instruções do provedor escolhido; os valores A, AAAA ou CNAME dependem do provedor e não devem ser presumidos.
7. Ativar HTTPS no provedor e verificar a renovação automática do certificado.
8. Conferir no domínio final os links de WhatsApp, telefone, e-mail, redes sociais, âncoras, imagens, metadados, canonical, `robots.txt` e `sitemap.xml`.

## Prévia e indexação

Sem `NEXT_PUBLIC_SITE_INDEXABLE=true`, a página gera `noindex` e `robots.txt` bloqueia rastreamento. Sem `NEXT_PUBLIC_SITE_URL`, canonical e sitemap não apontam para um domínio. Para uma prévia compartilhável, prefira senha ou URL de staging não indexada fornecida pela hospedagem.

## Conteúdo e contatos

Os canais principais ficam em `src/config/business.ts`. Não altere o WhatsApp principal, e-mail ou perfis sociais com base apenas em uma referência antiga; confirme com a empresa. O formulário não envia automaticamente nem guarda dados: abre o WhatsApp com o resumo e depende do usuário confirmar o envio.

## Revisão de lançamento

- [ ] Empresa aprova a versão visual e o texto comercial.
- [ ] Dados cadastrais e serviços são validados.
- [ ] Fotografias e usos de marca estão aprovados.
- [ ] Domínio e canal de hospedagem estão definidos.
- [ ] Build estático revisado e `out/` atualizado.
- [ ] DNS e HTTPS validados.
- [ ] SEO e indexação habilitados só após aprovação.
