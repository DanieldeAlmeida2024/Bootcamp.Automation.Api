# Controle de versões — Automação API (Cypress)

## API-QA 1.1.0 — 14/11/2026

- Dependências Cypress (`node_modules/`) removidas da árvore atual, mantendo manifests e lockfile.
- CI bloqueia reintrodução de dependências rastreadas; `npm ci` reproduz ambiente.
- `src/login-demo.cjs` recebe payloads de até 8 KiB sem armazenamento irrestrito na memória.
- Corpo acima do limite retorna HTTP 413; testes adicionais preservam respostas 400/401/200 existentes.
- A conta e o token permanecem **sintéticos** para estudo; nenhum acesso real é concedido.

### Escopo da limpeza

Sem reescrever histórico Git, remover segredos, alterar infraestrutura externa ou modificar a finalidade educacional. As versões anteriores dos arquivos de dependências continuam acessíveis em commits antigos.

## Reconciliação documental — 14/11/2026

- Recuperada a especificação específica, matriz de casos e dois diagramas UML da branch documental de 11/11/2026.
- Os novos arquivos foram adicionados **sem substituir** os documentos atuais de requisitos, arquitetura, testes e versão, que incluem correções de código e CI posteriores.
- Os documentos antigos receberam ressalva de escopo histórico; a evidência atual de execução continua no GitHub Actions e em `docs/PLANO_TESTES.md`.

## API-QA 1.2.0 · 27/11/2026

API-T05 e API-T06 agora exercitam 8.193 e 8.192 bytes UTF-8 com conteúdo multibyte. Os sete testes de contrato e a verificação de sintaxe passaram no Node.js 24.13.1 em `c89e010adb70f9f704a94dc4f207848b21f59612`. O limite e a implementação da API permanecem os vigentes.
