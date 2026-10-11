# Memória da IA (Harness)
Este repositório está em Harness › Portfolio GitHub Pages.
Chave: github.com/hugouchoasborges/hugouchoasborges.github.io.
Ao começar: `node C:/Users/hugou/.claude/skills/hugo-library/scripts/harness.mjs context --cwd D:/git/hugouchoasborges/HugoUchoasBorges.github.io`.

`site/` é a cópia pública do portfólio da Library. `npm run snapshot` recria a cópia; `npm test` testa o Worker; o workflow publica exclusivamente `site/`, sem código operacional ou credenciais.
O Worker usa a Library primeiro e o Pages apenas quando há falha/timeout/5xx. Não publicar dados privados nem tokens. Não substituir as rotas existentes dos outros serviços.
