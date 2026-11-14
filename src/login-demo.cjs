// API de demonstração sintética para testar o cliente Cypress, nunca produção.
const { createServer } = require('node:http');

function responder(res, status, dados) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(dados));
}

function criarServidor() {
  return createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/health') {
      return responder(res, 200, { status: 'ok' });
    }
    if (req.method !== 'POST' || req.url !== '/login') {
      return responder(res, 404, { erro: 'recurso_nao_encontrado' });
    }
    let corpo = '';
    req.on('data', trecho => { corpo += trecho; });
    req.on('end', () => {
      let dados;
      try { dados = JSON.parse(corpo); } catch {
        return responder(res, 400, { erro: 'json_invalido' });
      }
      if (typeof dados?.email !== 'string' || typeof dados?.senha !== 'string') {
        return responder(res, 400, { erro: 'campos_obrigatorios' });
      }
      if (dados.email !== 'aluno@example.test' || dados.senha !== 'senha-sintetica') {
        return responder(res, 401, { erro: 'credenciais_invalidas' });
      }
      return responder(res, 200, { autenticado: true, token: 'TOKEN_FICTICIO_APENAS_TESTE' });
    });
  });
}

if (require.main === module) {
  const porta = Number(process.env.PORT || 3009);
  criarServidor().listen(porta, '127.0.0.1', () => console.log('Demo disponível em 127.0.0.1:' + porta));
}

module.exports = { criarServidor };
