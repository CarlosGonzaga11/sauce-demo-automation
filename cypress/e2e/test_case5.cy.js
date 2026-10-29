describe("register with user with exisiting email", () => {
  it("deve retornar mensagem de erro para email ja existente", () => {
    cy.visit('https://automationexercise.com/login')
    cy.get('[data-qa="signup-name"]').type('carlos');
    cy.get('[data-qa="signup-email"]').type('carlos@mail.com');
    cy.get('[data-qa="signup-button"]').click();
    cy.get(".signup-form p").should("contain", "Email Address already exist!");
  });
});
