# AUT-API-06 — Validação de Content-Type no login local

14/11/2026 · API fictícia Node.js utilizada pelos testes Cypress.

## Problema
O endpoint POST /login fazia JSON.parse sem verificar o tipo de mídia. Requisições text/plain ou sem Content-Type eram aceitas se contivessem JSON válido. Isso contrariava a semântica HTTP do laboratório e poderia mascarar um cliente mal configurado.

## Contrato
- application/json, inclusive com charset UTF-8, continua válido.
- Content-Type ausente ou diferente de application/json retorna HTTP 415 sem token.
- As respostas 400, 401 e 413 existentes não mudam.
- Testes de contrato HTTP em porta aleatória exercitam os caminhos válidos e inválidos.

## Limite
Credenciais e token seguem fictícios. Isto não implementa autenticação produtiva.
