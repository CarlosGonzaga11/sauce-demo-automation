describe("verificar se esta na pagina de casos de teste", () => {
  it("deve ver se navegou para pagina de casos testes", () => {
    cy.visit("http://automationexercise.com");
    cy.get(".container").should("be.visible");
    cy.contains('.test_cases_list','Test Cases').click()
    cy.url().should('includes','test_cases')
  });
});
