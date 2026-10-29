describe("Deve realizar login", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });
  it("credenciais corretas", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
    cy.url().should("contain", "/inventory.html");
  });
  it("credenciais incorretas", () => {
    cy.get('[data-test="username"]').type("standard");
    cy.get('[data-test="password"]').type("secret");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and(
        "contain.text",
        "Epic sadface: Username and password do not match any user in this service",
      );
  });
  it("logar com campos vazios", () => {
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Epic sadface: Username is required");
    cy.url().should("be.equal", "https://www.saucedemo.com/");
  });
  it("login sem senha", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Epic sadface: Password is required");
    cy.url().should("equal", "https://www.saucedemo.com/");
  });
});
