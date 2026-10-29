describe("register user", () => {
  it("passes", () => {
    cy.visit("http://automationexercise.com");
    // verifica se ta pagina visivel
    cy.get(".shop-menu").should("be.visible");
    cy.get(".logo").should("be.visible");
    // clicar em signiup  - n temmos a classe test, pegando pelo html
    cy.get('a[href="/login"]').click();
    //. Verify 'New User Signup!' is visible
    cy.get(".signup-form h2")
      .should("be.visible")
      .should("contain", "New User Signup!");
  });

  // mudei o link do visit pois o site fica dando redirect 301 quando usa o link basico
  it("deve realizar signup completo", () => {
    const randomEmail = `carlos_${Date.now()}@mail.com`;
    cy.visit("https://automationexercise.com/login");
    // AQUI TEMOS dados de teste  - preencher os input
    cy.get('[data-qa="signup-name"]').type("carlos");
    cy.get('[data-qa="signup-email"]').type(randomEmail);
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
  });
});
