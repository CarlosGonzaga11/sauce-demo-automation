
describe("Testes de API", () => {
  it("deve consultar um usuário e validar os dados", () => {
    cy.request("GET", "https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        expect(response.status).to.equal(200);

        expect(response.body).to.have.property("id", 1);

        expect(response.body).to.have.property(
          "name",
          "Leanne Graham"
        );

        expect(response.body.email).to.contain("@");
      });
  });
});
