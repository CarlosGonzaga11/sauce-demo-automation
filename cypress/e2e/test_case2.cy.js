describe("deve realizar login com credenciais validas", () => {
  beforeEach(() => {
    cy.visit("https://automationexercise.com/login");
  });
  it("", () => {
    cy.get("#form > .container > .row > .col-sm-offset-1").should("be.visible");

    cy.get('[data-qa="login-email"]').type("carlosgonzaga@mail.com");
    cy.get('[data-qa="login-password"]').type("carlosgonzaga");
    cy.get('[data-qa="login-button"]').click();

    cy.get(".shop-menu").should("be.visible").should("contain", "Logged in as");

    cy.get(".shop-menu > .nav > :nth-child(5) > a").click();
    cy.contains('[data-qa="account-deleted"]', "ACCOUNT DELETED!", {
      matchCase: false,
    }).should("be.visible");
  });
  it("login com dados incorretos", () => {
    cy.get('[data-qa="login-email"]').type("carlos123@mail.com");
    cy.get('[data-qa="login-password"]').type("CARLOS123");
    cy.get('[data-qa="login-button"]').click();

    cy.get('.login-form > form > p').should('contain','Your email or password is incorrect!')
  });
});
