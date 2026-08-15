# Portal Neural Capital — código-fonte

Pacote de continuidade do Portal Neural Capital, contendo o código-fonte editável da versão atual da Home institucional para Forex e Criptoativos.

## Estado atual

- Front-end responsivo em uma única página, com navegação por âncoras.
- Menu desktop e menu móvel.
- Seções Forex, Criptoativos, orientação inicial, comunidade, suporte e rodapé.
- Animação 3D do símbolo original “N” da Neural Capital.
- Projeto “Cartão Ether.fi” incluído em Criptoativos.
- Links de Telegram e WhatsApp são placeholders, ainda sem URLs oficiais.
- Não há backend de negócio, banco de dados ativo, autenticação aplicada às páginas, painel administrativo, CMS, pagamentos ou integrações externas.

## Tecnologias

- Node.js `>=22.13.0`
- React 19 + TypeScript
- Next.js App Router sobre Vinext/Vite
- Tailwind CSS 4
- Cloudflare Worker / ChatGPT Sites
- Drizzle ORM disponível no starter, mas sem tabelas ou banco configurado

As versões exatas estão fixadas em `package.json` e `package-lock.json`.

## Como executar localmente

Pré-requisitos: Node.js 22.13 ou superior e, no ambiente Linux, `bash`, `flock`, `curl`, `sha256sum` e GNU `timeout`.

```bash
npm ci
npm run dev
```

O terminal informará o endereço local do servidor de desenvolvimento. Para uma compilação de produção:

```bash
npm run build
```

Para iniciar o artefato compilado:

```bash
npm run start
```

Outros comandos úteis:

```bash
npm run lint
npm test
npm run validate:artifact
```

## Estrutura principal

- `app/page.tsx`: conteúdo, componentes reutilizáveis e navegação da Home.
- `app/globals.css`: identidade visual, animações e responsividade.
- `app/layout.tsx`: layout global, tipografia e metadados.
- `public/`: logomarca, símbolo “N” transparente, favicon e demais assets.
- `worker/`, `build/`, `scripts/`, `vite.config.ts`: build e execução no Cloudflare/Sites.
- `db/schema.ts`: schema intencionalmente vazio; não existem migrations de aplicação.
- `.openai/hosting.json`: identidade e bindings do projeto no ChatGPT Sites.
- `.env.example`: referência de configuração local; atualmente nenhuma variável é obrigatória.
- `neural-capital-history.bundle`: histórico Git transportável.

O arquivo `STARTER_README.md` preserva a documentação técnica original do starter e dos scripts de build.

## Banco de dados e serviços externos

O manifesto atual possui `d1: null` e `r2: null`. Portanto:

- nenhum banco Cloudflare D1 está ligado ao portal;
- nenhum storage R2 está ligado ao portal;
- `db/schema.ts` não define tabelas;
- não há migrations necessárias;
- não existem APIs, chaves, webhooks ou credenciais exigidas pela versão atual.

Os utilitários de Drizzle e de autenticação presentes no starter são apenas infraestrutura preparada para evolução futura e não estão em uso pela Home.

## Fontes e assets

A interface usa Geist por meio do mecanismo de fontes do framework e fallbacks do sistema. Os arquivos WOFF2 já incorporados pelo framework estão preservados em `.vinext/fonts/`, exatamente como no código-fonte publicado. Os demais assets visuais efetivamente usados estão em `public/`, incluindo a logomarca original e o PNG transparente do símbolo “N”.

## Hospedagem e publicação

A versão atual está publicada em:

https://neural-capital.neural-capital.chatgpt.site

O projeto está hospedado pelo ChatGPT Sites sobre Cloudflare Worker. Para continuar publicando no mesmo projeto, o novo desenvolvedor precisará receber acesso autorizado ao Site. O código também pode ser adaptado para outra hospedagem compatível com Next.js/Vite/Cloudflare, respeitando a configuração do provedor escolhido.

## Histórico Git

O pacote inclui um bundle Git completo. Para restaurar um clone com o histórico:

```bash
git clone neural-capital-history.bundle neural-capital
cd neural-capital
```

O bundle representa o código original versionado. Este pacote acrescenta somente a documentação de transferência e `.env.example` fora desse histórico, para facilitar a entrega.

## Segurança

Nenhum arquivo `.env` real, senha, token, chave privada, cache, dependência instalada ou artefato compilado foi incluído. Ao implementar novas integrações, mantenha apenas os nomes das variáveis em `.env.example` e nunca versione valores sensíveis.

## Validação da entrega

Este pacote foi preparado em 15/08/2026. A instalação limpa com o lockfile e a compilação de produção foram executadas antes da geração do ZIP. Consulte `VALIDACAO.md` para o resultado registrado.
