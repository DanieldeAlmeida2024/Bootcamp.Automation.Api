# Testes automatizados de API — Cypress

Laboratório de testes HTTP e contratos de autenticação com Cypress, Node.js e JavaScript. Os cenários utilizam uma API de demonstração local com contas fictícias e respostas previsíveis.

## Preparação e execução

```bash
npm ci
npm test
```

O comando `npm test` valida o contrato HTTP da API de demonstração em porta efêmera, sem depender de serviço externo.

Para executar os cenários Cypress:

```bash
npm run demo:api
```

Em outro terminal:

```bash
npm run test:cypress
```

O serviço de demonstração é iniciado na porta local `3009`.

## Cenários automatizados

- Disponibilidade do serviço (liveness).
- Login sintético com credenciais válidas.
- Rejeição de senha incorreta.
- Tratamento de corpo de requisição malformado.
- Verificação de que respostas de erro não expõem token.

O token emitido pela demonstração não é um mecanismo de autenticação para produção. O GitHub Actions executa os testes deste laboratório; integrações com sistemas reais exigem ambiente próprio de homologação.

## Documentação

[Requisitos](docs/REQUISITOS.md) · [Arquitetura](docs/ARQUITETURA.md) · [UML](docs/UML.puml) · [Plano de testes](docs/PLANO_TESTES.md) · [Guia de manutenção](AGENTS.md).
