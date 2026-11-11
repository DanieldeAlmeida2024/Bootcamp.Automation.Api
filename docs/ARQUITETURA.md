# Arquitetura — Bootcamp.Automation.Api

## Visão geral
Automação de testes de endpoints de login com Cypress.

**Stack atual:** JavaScript, Node.js e Cypress.

O fluxo conceitual compreende entrada do usuário, validação de parâmetros, execução do exercício ou roteiro e saída observável. Integrações externas devem ser isoladas para testes com simulação.

## Decisões
- Preservar a tecnologia original em vez de reescrever o projeto.
- Distinguir testes estruturais de documentação dos testes funcionais reais.
- Evitar dados sensíveis, dependências implícitas e comandos não verificados.

## Limitações
É necessário configurar uma API de teste acessível; npm test contém placeholder.

Diagrama: [UML.puml](UML.puml).
