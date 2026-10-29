describe("Testing contact us form", () => {
  it("", () => {
    cy.visit("http://automationexercise.com");
    cy.get(".container").should("be.visible");
    cy.get('a[href="/contact_us"]').click();
    cy.get(".contact-form h2")
      .should("be.visible")
      .should("contain", "Get In Touch");
    cy.get('[data-qa="name"]').type("carlos");
    cy.get('[data-qa="email"]').type("carlos@mail.com");
    cy.get('[data-qa="subject"]').type("carlos esta aprendendo a usar testes automaticos");

    cy.get('[data-qa="message"]').type("carlos baixou cypress e começou a estudar cypress, usou ia pra gerar topicos essenciais que deve aprender");
    cy.get('input[name="upload_file"]').selectFile('cypress/fixtures/example.png')
    cy.get('[data-qa="submit-button"]').click()
    cy.get('.alert-success').should('be.visible').should('contain','Success! Your details have been submitted successfully.')
    cy.get('#form-section a').click()
    cy.url().should('eq','https://automationexercise.com/')
});
});
