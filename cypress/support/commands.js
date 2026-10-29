Cypress.Commands.add("Login", (username, password) => {
  cy.visit("https://www.saucedemo.com/");
  if (username !== "") {
    cy.get('[data-test="username"]').type(username);
  }
  if (password !== "") {
    cy.get('[data-test="password"]').type(password);
  }
  cy.get('[data-test="login-button"]').click();
});
Cypress.Commands.add("AddProductChart", (name) => {
  cy.contains(".inventory_item", name)
    .should("be.visible")
    .within(() => {
      cy.get(".btn_inventory").click();
      cy.get(".btn_inventory").should("contain.text", "Remove");
    });
});
Cypress.Commands.add("removeProduct", (name) => {
  cy.contains(".inventory_item", name)
    .should("be.visible")
    .within(() => {
      cy.get(".btn_inventory").click();
      cy.get(".btn_inventory").should("contain.text", "Add to cart");
    });
});

/************************************* */
Cypress.Commands.add("login", (email, password) => {
  cy.visit("https://automationexercise.com/login");

  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(password);
  cy.get('[data-qa="login-button"]').click();
});

Cypress.Commands.add("registerUser", (username, email) => {
  cy.visit("https://automationexercise.com/login");
  cy.get('[data-qa="signup-name"]').type(username);
  cy.get('[data-qa="signup-email"]').type(email);
  // click signup
  cy.get('[data-qa="signup-button"]').click();
  // verificar se que 'ENTER ACCOUNT INFORMATION' é visivel
  cy.get(".login-form h2 b")
    .should("be.visible")
    .should("contain", "Enter Account Information");

  // preencher o form
  cy.get("#id_gender1").check();

  cy.get('[data-qa="password"]').type("carlosgonzaga");
  cy.get('[data-qa="days"]').select("6");
  cy.get('[data-qa="months"]').select("May");
  cy.get('[data-qa="years"]').select("1999");

  cy.get("#newsletter").check().should("be.checked");
  cy.get("#optin").check().should("be.checked");

  // adress inf
  cy.get('[data-qa="first_name"]').type("casa");
  cy.get('[data-qa="last_name"]').type("do carlinho");
  cy.get('[data-qa="company"]').type("sem companhia");
  cy.get('[data-qa="address"]').type("rua do carlinho");
  cy.get('[data-qa="address2"]').type("rua na esquina do carlinho");
  cy.get('[data-qa="country"]').select("Canada");
  cy.get('[data-qa="state"]').type("Minas Gerais");
  cy.get('[data-qa="city"]').type("Itajubá");
  cy.get('[data-qa="zipcode"]').type("12345678");
  cy.get('[data-qa="mobile_number"]').type("40028222");
  cy.get('[data-qa="create-account"]').click();

  cy.contains('[data-qa="account-created"]', "ACCOUNT CREATED!", {
    matchCase: false,
  }).should("be.visible");
  cy.get('[data-qa="continue-button"]').click();
});
