# Contratos HTTP com Cypress e restful-api.dev

Versão documental **1.0.0** (11/11/2026). Código auditado `main` @ `d2818b1e18e109f2b195d135061f64cc4b4087ac`; cenários não executados nesta revisão.

## Contexto e dependências
Cypress E2E em JavaScript; cenários em cypress/e2e/buscar-dispositivo.cy.js, configuração cypress.config.js.

## Módulos / contratos existentes
| Arquivo ou ação | Comportamento verificado no código | Cenário principal |
|---|---|---|
| `cypress/e2e/buscar-dispositivo.cy.js — GET /objects/7` | cy.request espera 200 e id literal '7'. | AUT-API01: resposta 200 e contrato id string '7'. |
| `GET /objects/aeijeiajeijwe` | cy.request com failOnStatusCode:false espera 404. | AUT-API02: ID inexistente não retorna dados. |
| `POST /objects` | Objeto name 'Dispositivo do Daniel' e data year, price, CPU model, Hard disk size, cor; teste espera status 200. | AUT-API03: verificar status real e campos criados; serviço externo pode mudar. |
| `cypress.config.js` | Configuração define E2E com setupNodeEvents vazio, sem fixture de servidor próprio. | AUT-API04: execução tem rede/DNS; não há mock de API no snapshot. |

## Fluxo operacional
Os exemplos estão organizados para execução individual, sem backend próprio. Os scripts e suites têm efeitos e pré-condições diferentes: registrar o diretório de trabalho, dependência externa, dados usados e efeitos em arquivo/serviço.

```bash
npx cypress run --spec cypress/e2e/buscar-dispositivo.cy.js
```

## Riscos e decisões
Os testes dependem de https://api.restful-api.dev/objects, que é externo e sujeito a limites, alteração de status e dados públicos. O teste de POST cria registro real no serviço de demonstração, sem limpeza explícita. Evitar CI em alta frequência; preferir stub para camada de contrato e isolar testes live.

Esta documentação não cria infraestrutura, altera contrato nem valida automaticamente integração com a rede. Todo novo recurso requer caso de teste com dado de entrada, resultado esperado e evidência de execução.
