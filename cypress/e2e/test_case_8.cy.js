describe("", () => {
  it("", () => {
    cy.visit("http://automationexercise.com");
    cy.get(".container").should("be.visible");
    cy.get('a[href="/products"]').click();
    cy.get(".features_items h2")
      .should("be.visible")
      .should("contain", "All Products");
    cy.get(".features_items").should("be.visible");
    cy.get('a[href="/product_details/1"]').click();
    cy.url().should("contain", "product_details/1");

    cy.get(".product-information").within(() => {
      cy.get("h2").should("be.visible").and("not.be.empty");

      cy.contains("p", "Category:").should("be.visible");
      cy.get("span span").should("be.visible");
      cy.get("#quantity").should("be.visible");

      cy.contains("b", "Availability:").should("be.visible");
      cy.contains("b", "Condition:").should("be.visible");
      cy.contains("b", "Brand:").should("be.visible");
    });
  });
});
