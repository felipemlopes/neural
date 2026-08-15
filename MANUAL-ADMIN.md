# Manual do Painel Administrativo — Neural Capital

Este manual explica, passo a passo, como gerenciar o conteúdo do portal pelo painel administrativo, sem necessidade de conhecimentos de programação.

## Acesso

1. Acesse `https://<seu-dominio>/admin`.
2. Entre com o e-mail e a senha de gestor (criados no primeiro acesso).
3. Para sair, use o botão **SAIR** no topo.

> O acesso é restrito a administradores. Usuários comuns não conseguem entrar.

## Dashboard

A tela inicial mostra o resumo do portal: total de projetos, categorias, aulas e links (ativos/total), além dos últimos projetos e aulas cadastrados.

## Projetos

- **Criar**: clique em **+ NOVO PROJETO**, preencha título, descrição, mercado (Forex/Criptoativos), categoria e os demais campos e clique **SALVAR**.
- **Editar**: clique em **EDITAR** no projeto desejado, altere os campos e salve.
- **Ocultar/Mostrar**: use **OCULTAR** para remover o projeto do site (sem apagar) e **MOSTRAR** para reativá-lo.
- **Excluir**: clique em **EXCLUIR** (ação permanente).
- **Ordenar**: use as setas **↑ ↓** para mudar a ordem de exibição.

## Categorias

As categorias são organizadas em árvore (categoria pai → subcategorias).

- **Criar**: **+ NOVA CATEGORIA** (escolha "Raiz" ou uma categoria pai).
- **Subcategoria**: clique em **+SUB** ao lado de uma categoria para criar uma filha.
- **Editar/Ocultar/Excluir/Ordenar**: mesmos botões da tela de Projetos.

## Aulas

Cadastro de aulas e materiais educacionais.

- **Criar**: **+ NOVA AULA** e preencha título, resumo, conteúdo, categoria/projeto e, se houver, a **URL do vídeo** (YouTube/Vimeo — o vídeo é incorporado ao site).
- **Editar/Ocultar/Excluir/Ordenar**: mesmos botões das outras telas.

## Mídia

Anexa arquivos e links a um conteúdo (projeto, aula ou categoria).

1. Em **Tipo de conteúdo**, escolha Projeto, Aula ou Categoria.
2. Em **Conteúdo**, selecione o item específico.
3. Em **Adicionar mídia**, escolha o tipo:
   - **Imagem** ou **PDF**: selecione o arquivo do seu computador (ou informe uma URL externa).
   - **Vídeo** ou **Link**: informe a URL.
4. Clique **ADICIONAR**.

As imagens e PDFs aparecem na página do conteúdo no site (galeria e downloads).

## Links da Comunidade

Cadastro dos botões de contato exibidos no site (Telegram, WhatsApp ou Outro). Basta informar o **rótulo**, o **tipo** e a **URL**, e usar os botões para ocultar, editar, excluir ou ordenar.

## Usuários

- **Criar usuário**: **+ NOVO USUÁRIO** (nome, e-mail, senha e role `admin` ou `member`).
- **Promover/Rebaixar**: altera o papel do usuário entre `admin` e `member`.

## Configurações

Ajuste nome da plataforma, e-mail de suporte, timezone, moeda e preferências do sistema. Clique em **SALVAR ALTERAÇÕES** para aplicar.

## Backup e recuperação

O backup é automático no servidor (agendado diariamente) e inclui o banco de dados e os arquivos enviados. Para restaurar, entre em contato com o responsável técnico ou siga o procedimento documentado na hospedagem.
