# Portal Neural Capital — código-fonte

Portal institucional da Neural Capital (Forex e Criptoativos) com CMS completo, painel administrativo e API.

## Arquitetura

- **Frontend**: Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 (`app/`).
- **Backend/API**: Laravel 10 + PHP 8.1+ + Sanctum (`backend/`).
- **Banco de dados**: MySQL (ou SQLite em ambiente de teste).
- **Arquivos**: imagens e PDFs armazenados em `backend/storage/app/public` (servidos via `/storage`); vídeos por embed (YouTube/Vimeo).

## Funcionalidades

### Site público

- Home institucional responsiva (Forex, Criptoativos, Comunidade).
- Páginas de **categoria** (`/categoria/[slug]`), **projeto** (`/projeto/[slug]`) e **aula** (`/aula/[slug]`) com SEO dinâmico.
- Renderização de galeria de imagens, vídeos (embed), PDFs para download e links externos.
- Botões de comunidade (Telegram/WhatsApp/outros) gerenciáveis.

### Painel administrativo (`/admin`)

- Autenticação por token Sanctum + guard de rota server-side (`proxy.ts`).
- **Dashboard** com métricas reais do CMS.
- CRUD de **Projetos**, **Categorias** (hierárquicas), **Aulas**, **Mídia** e **Links da comunidade**.
- Ocultar/mostrar (active), reordenação dinâmica e upload de arquivos.
- Gestão de **Usuários** (criar admins, alterar role) e **Configurações** persistidas.
- Auditoria de ações administrativas.

## Como executar localmente

Pré-requisitos: Node.js 22+, PHP 8.1+, Composer e MySQL.

### Backend (API)

```bash
cd backend
composer install
cp .env.example .env            # ajuste as credenciais de banco
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve               # http://localhost:8000
```

Credenciais iniciais (via seeder):

- Admin: `admin@neuralcapital.com` / `NeuralAdmin@2026`

### Frontend

```bash
npm ci
npm run dev                     # http://localhost:3000
```

Configure a URL da API em `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Comandos

```bash
npm run build                   # build de produção do frontend
npm run lint                    # ESLint
npm run start                   # serve o build de produção

cd backend
php artisan test                # testes (usa SQLite em memória)
```

## Publicação

Recomenda-se um VPS único (Nginx + PHP-FPM + Node/PM2 + MySQL) com domínio próprio e SSL via Let's Encrypt. Em produção, configure:

- Backend `.env`: `APP_URL`, `FRONTEND_URL`, `APP_DEBUG=false`, credenciais do banco e `SANCTUM_STATEFUL_DOMAINS`.
- Frontend `.env.local`: `NEXT_PUBLIC_API_URL` apontando para o domínio da API.
- Backup: cron diário de `mysqldump` + cópia de `backend/storage/app/public`.

## Segurança

Nenhuma credencial ou segredo é versionado. Mantenha apenas os nomes das variáveis em `.env.example` e nunca versione valores sensíveis.
