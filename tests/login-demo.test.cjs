const { before, after, test } = require('node:test');
const assert = require('node:assert/strict');
const { criarServidor, MAX_LOGIN_BODY_BYTES } = require('../src/login-demo.cjs');

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
  assert.equal((await enviar('{"email":"aluno@example.test","senha":"123"')).status, 400);
});


test('login rejeita tipo de corpo ausente ou divergente sem emitir token', async () => {
  const dados = JSON.stringify({ email: 'aluno@example.test', senha: 'senha-sintetica' });
  for (const headers of [{ 'Content-Type': 'text/plain' }, {}]) {
    const resposta = await fetch(url + '/login', { method: 'POST', headers, body: dados });
    assert.equal(resposta.status, 415);
    const corpo = await resposta.json();
    assert.deepEqual(corpo, { erro: 'tipo_de_conteudo_invalido' });
    assert.equal(corpo.token, undefined);
  }
  const resposta = await fetch(url + '/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: dados,
  });
  assert.equal(resposta.status, 200);
});

function corpoComTamanho(bytes) {
  const json = JSON.stringify({ email: 'aluno@example.test', senha: 'senha-sintetica', extra: 'á' });
  // Espaços após o objeto são válidos em JSON. O acento diferencia bytes de caracteres.
  const corpo = json + ' '.repeat(bytes - Buffer.byteLength(json, 'utf8'));
  assert.equal(Buffer.byteLength(corpo, 'utf8'), bytes);
  return corpo;
}

test('corpo JSON com um byte acima de 8 KiB retorna 413 sem token', async () => {
  const { status, dados } = await enviar(corpoComTamanho(MAX_LOGIN_BODY_BYTES + 1));
  assert.equal(status, 413);
  assert.deepEqual(dados, { erro: 'corpo_excede_limite' });
  assert.equal(dados.token, undefined);
});
test('corpo JSON com exatamente 8 KiB retorna 200', async () => {
  assert.equal(MAX_LOGIN_BODY_BYTES, 8192);
  const { status, dados } = await enviar(corpoComTamanho(MAX_LOGIN_BODY_BYTES));
  assert.equal(status, 200);
  assert.equal(dados.autenticado, true);
});
