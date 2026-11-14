const { before, after, test } = require('node:test');
const assert = require('node:assert/strict');
const { criarServidor } = require('../src/login-demo.cjs');

let servidor;
let url;

before(async () => {
  servidor = criarServidor();
  await new Promise(resolve => servidor.listen(0, '127.0.0.1', resolve));
  url = 'http://127.0.0.1:' + servidor.address().port;
});
after(async () => {
  await new Promise((resolve, reject) => servidor.close(erro => erro ? reject(erro) : resolve()));
});

async function enviar(corpo) {
  const resposta = await fetch(url + '/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: corpo,
  });
  return { status: resposta.status, dados: await resposta.json() };
}
test('health retorna 200', async () => {
  assert.equal((await fetch(url + '/health')).status, 200);
});
test('credencial sintética correta retorna sucesso', async () => {
  const { status, dados } = await enviar(JSON.stringify({ email: 'aluno@example.test', senha: 'senha-sintetica' }));
  assert.equal(status, 200);
  assert.equal(dados.autenticado, true);
});
test('senha incorreta retorna 401 sem token', async () => {
  const { status, dados } = await enviar(JSON.stringify({ email: 'aluno@example.test', senha: 'incorreta' }));
  assert.equal(status, 401);
  assert.equal(dados.token, undefined);
});
test('payload inválido retorna 400', async () => {
  assert.equal((await enviar('json incorreto')).status, 400);
  assert.equal((await enviar('{}')).status, 400);
});
