describe("logout de usuario", () => {
  it("deve vericar se usuario está logado e realizar logout", () => {
   let email = `carlos_${Date.now()}@mail.com`;
    let pass = "carlosgonzaga";
    let username = "carlos";
    cy.registerUser(username, email);
    cy.get('a[href="/logout"]').click();

    cy.login(email, pass);
    cy.get(".shop-menu").should("be.visible").should("contain", "Logged in as");
     cy.get('a[href="/logout"]').click();
    cy.url().should('contain','/login')
  });
});
