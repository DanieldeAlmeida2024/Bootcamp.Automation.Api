# Plano de testes — Bootcamp.Automation.Api

Versão documental **1.0.0** (11/11/2026). Código auditado `main` @ `d2818b1e18e109f2b195d135061f64cc4b4087ac`; cenários não executados nesta revisão.

## Matriz vinculada ao código
| ID | Artefato | Critério verificável | Situação |
|---|---|---|---|
| T-01 | `cypress/e2e/buscar-dispositivo.cy.js — GET /objects/7` | AUT-API01: resposta 200 e contrato id string '7'. | Planejado/requer execução |
| T-02 | `GET /objects/aeijeiajeijwe` | AUT-API02: ID inexistente não retorna dados. | Planejado/requer execução |
| T-03 | `POST /objects` | AUT-API03: verificar status real e campos criados; serviço externo pode mudar. | Planejado/requer execução |
| T-04 | `cypress.config.js` | AUT-API04: execução tem rede/DNS; não há mock de API no snapshot. | Planejado/requer execução |

## Cenários adicionais e regressão
- N-01: ausência do arquivo/serviço necessário; mensagem controlada ou erro capturado.
- N-02: resposta/conteúdo fora do contrato (schema e tipos); não marcar como aprovado por mera presença de arquivo.
- N-03: dados incorretos e entradas vazias; não sobrescrever arquivos do usuário ou produzir mutações não solicitadas.
- N-04: repetir a execução em ambiente limpo e comparar evidências.

## Execução
```bash
npx cypress run --spec cypress/e2e/buscar-dispositivo.cy.js
```

Registrar SHA, versão da ferramenta, fixtures, resultado, stdout/HTTP, condições de rede e duração. `tests/test_documentacao.py` é apenas verificação documental; não substitui os cenários acima.
