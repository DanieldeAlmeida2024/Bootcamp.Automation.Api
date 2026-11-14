describe('API de login sintética (contrato local)', () => {
  const api = 'http://127.0.0.1:3009';

  it('autentica a conta fictícia', () => {
    cy.request('POST', api + '/login', {
      email: 'aluno@example.test', senha: 'senha-sintetica',
    }).then(({ status, body }) => {
      expect(status).to.equal(200);
      expect(body).to.have.property('autenticado', true);
    });
  });

  it('recusa senha errada sem devolver token', () => {
    cy.request({
      method: 'POST', url: api + '/login', failOnStatusCode: false,
      body: { email: 'aluno@example.test', senha: 'errada' },
    }).then(({ status, body }) => {
      expect(status).to.equal(401);
      expect(body).not.to.have.property('token');
    });
  });
});
