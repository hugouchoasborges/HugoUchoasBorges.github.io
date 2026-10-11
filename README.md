# Portfólio — cópia da Hugo's Library

O portfólio continua sendo editado na Library. `site/` contém a última cópia estática para https://hugouchoasborges.github.io, incluindo imagens, GIFs, vídeo, estudos de caso e PDFs do currículo. O workflow publica apenas `site/` ao atualizar `master`.

## Atualização automática

O GitHub verifica a publicação da Library a cada 30 minutos (minutos 17 e 47). Se o HTML ou alguma mídia mudar, exporta a cópia completa, salva um commit e publica no Pages. Sem mudanças, mantém a publicação atual. Se a Library estiver indisponível ou uma mídia falhar, preserva a última cópia boa e registra a falha no workflow.

Para atualizar imediatamente, abra Actions → Publish portfolio snapshot → Run workflow no GitHub. A rotina roda no GitHub; seu PC só precisa estar acessível para fornecer uma versão nova da Library.

Os horários são aproximados: o GitHub pode atrasar execuções. Em repositórios públicos, o GitHub também desativa agendamentos após 60 dias sem atividade no repositório; nesse caso, reative o workflow em Actions. Referência: https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule.

## Atualizar manualmente

```powershell
npm ci
npm run snapshot
npm test
git add site fallback/manifest.mjs
git commit -m "Update portfolio snapshot"
git push origin master
```

A exportação consulta apenas a publicação pública, sem tokens. Se algum arquivo não puder ser exportado, ela falha antes de substituir a última cópia boa. Novos arquivos são reconhecidos pelo Worker sem precisar republicá-lo. Alterações no próprio código do Worker continuam exigindo `npm run deploy:fallback`.

## Fallback

`fallback/worker.mjs` intercepta apenas `pub.hugoborges.dev.br/p/portfolio*` e verifica o limite exato `/p/portfolio`. GET/HEAD usam a Library primeiro; falhas de conexão, timeout de 4,5 s ou respostas 5xx usam o GitHub Pages, preservando a URL. 404, autenticação e operações de escrita não são desviadas. Mídias da cópia usam um caminho próprio e não dependem da Library. Cookies e credenciais não são encaminhados ao GitHub.

Não modifica as rotas dos outros serviços. Para reverter o fallback, remova somente a rota `pub.hugoborges.dev.br/p/portfolio*` associada a `portfolio-github-fallback`; a rota anterior do domínio continua cadastrada.

## Verificação local

`npm run preview` serve a cópia em http://127.0.0.1:8117. `npm test` testa disponibilidade, timeout, 404, isolamento de rotas e proteção de credenciais. `scripts/qa.mjs` verifica mídias e navegação com acesso à Library bloqueado.

O Jekyll anterior permanece no histórico Git, antes do commit de migração. Backup adicional: `C:/Users/hugou/.codex/outputs/portfolio-snapshot-2026-10-11/github-pages-before.zip`.
