# Plano de testes — Bootcamp.Automation.Api

## Casos
1. Entrada válida: deve produzir o resultado documentado.
2. Entrada inválida: deve gerar mensagem clara e não produzir sucesso falso.
3. Dependência indisponível: comportamento deve ser identificado.
4. Documentação: arquivos mínimos e PlantUML legíveis.

## Comandos
```bash
npm ci
npm test
python -m unittest discover -s tests -p "test_documentacao.py" -v
```

**Atenção:** o teste Python adicionado apenas confere a estrutura documental. Não valida navegador, APIs ou serviços reais.

## API-QA-2026-11-14 — limites de requisição e reprodutibilidade

| ID | Contrato | Automação |
| --- | --- | --- |
| API-C01 | `node_modules/` não pode estar rastreado | GitHub Actions `git ls-files -- node_modules` |
| API-C02 | Dependências são instaladas do lockfile | `npm ci` |
| API-T05 | Corpo HTTP com 8.193 bytes UTF-8 | Resposta HTTP 413, sem `token` |
| API-T06 | Corpo HTTP com exatamente 8.192 bytes UTF-8 e credenciais sintéticas | Resposta HTTP 200 |
| API-T07 | JSON malformado, mesmo pequeno | Resposta HTTP 400 |
| API-T08 | Senha incorreta | Resposta HTTP 401, sem `token` |
| API-E01 | Contrato HTTP no Cypress local | `cypress/e2e/login-demo.cy.js` |

Os testes não requerem servidor de autenticação real nem serviço externo. O limite controla a memória retida durante o recebimento do JSON; **não** substitui rate limiting, identidade/autorização, autenticação real ou um reverse proxy com controle de conexões.

Para executar API-E01, inicie `npm run demo:api` em um terminal e execute `npm run test:cypress` em outro.
