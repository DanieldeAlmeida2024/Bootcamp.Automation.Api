# Bootcamp.Automation.Api

Automação de testes de endpoints de login com Cypress. **Material didático**, não é produto de produção.

## Requisitos e execução

Tecnologias: JavaScript, Node.js e Cypress.

```bash
npm install
npx cypress open
```

`npm test` executa quatro testes HTTP contra uma API sintética iniciada em porta efêmera, sem serviços externos. Para validar **Cypress**, inicie a API local com `npm run demo:api` e, em outro terminal, execute `npm run test:cypress`. O workflow de PR automatiza ambos. **Não representa autenticação de produção** nem substitui testes da API real.

## Documentação

- [Requisitos](docs/REQUISITOS.md)
- [Arquitetura](docs/ARQUITETURA.md)
- [UML](docs/UML.puml)
- [Plano de testes](docs/PLANO_TESTES.md)
- [Instruções para assistentes](AGENTS.md)

## Registro da documentação original

## Automação de testes em API com Cypress
- Neste projeto é feito a automação de teste de qualidade de API de login, para fins didáticos

#### Requisitos
- NodeJs
- Visual Studio Code ou IDE de preferencia, compativel com javascript/Node
- Terminal / CMD

### Execução
  - Abrir pasta do projeto no terminal e dentro executar o comando "npx cypress open"
  - Será exibido uma tela de abertura do cypress com o dashboard de testes.

## Cenários reproduzíveis (auditoria de 13/11/2026)

```bash
npm ci
npm test
npm run demo:api           # terminal 1 (porta 3009, apenas localhost)
npm run test:cypress       # terminal 2
```

Casos testados: liveness, credencial sintética aceita, senha incorreta recusada, payload malformado e ausência de token no erro. O servidor de demonstração contém credenciais inventadas e token **não autenticador**; jamais expô-lo publicamente. Integração com serviço real deve ser configurada e homologada separadamente.
