# Plano de testes — Bootcamp.Automation.Api

## Casos
1. Entrada válida: deve produzir o resultado documentado.
2. Entrada inválida: deve gerar mensagem clara e não produzir sucesso falso.
3. Dependência indisponível: comportamento deve ser identificado.
4. Documentação: arquivos mínimos e PlantUML legíveis.

## Comandos
```bash
npm install
npx cypress open
python -m unittest discover -s tests -p "test_documentacao.py" -v
```

**Atenção:** o teste Python adicionado apenas confere a estrutura documental. Não valida navegador, APIs ou serviços reais.
