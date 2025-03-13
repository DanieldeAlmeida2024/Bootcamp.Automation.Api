/// <reference types="cypress" />

describe("buscar dispositivos", () => {
    it("Buscar dispositivo específico", () => {
        cy.request({
            method: 'GET',
            url: 'https://api.restful-api.dev/objects/7'
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal('7');
        })

    });
    it("Buscar dispositivo inexistente", () => {
        cy.request({
            method: 'GET',
            url: 'https://api.restful-api.dev/objects/aeijeiajeijwe',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(404);
        });
    });
    it("Cadastrar dispositivo", () => {
        cy.request({
            method: 'POST',
            url: 'https://api.restful-api.dev/objects',
            body: {
                "name": "Dispositivo do Daniel",
                "data": {
                    "year": "2025",
                    "price": 4000,
                    "CPU model": "Adreno Cortex",
                    "Hard disk size": "1 Tb",
                    "cor": "preto"
                }
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
});