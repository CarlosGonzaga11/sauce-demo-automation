describe("deve realizar login e testar a adição de produto no carrinho", () => {
  beforeEach(() => {
    cy.Login("standard_user", "secret_sauce");
  });
  it("deve realizar a adição de um item ao carrinho e verificar se foi adicionado", () => {
    cy.AddProductChart("Sauce Labs Bike Light");
    cy.AddProductChart("Sauce Labs Onesie");

    cy.get('[data-test="shopping-cart-badge"]')
      .should("be.visible")
      .and("have.text", "2");
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get(".cart_list").find(".cart_item").should("have.length", 2);

    cy.contains(".cart_item", "Sauce Labs Bike Light")
      .find(".inventory_item_price")
      .should("have.text", "$9.99");

    cy.contains(".cart_item", "Sauce Labs Onesie")
      .find(".inventory_item_price")
      .should("have.text", "$7.99");

    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type("Carlos");
    cy.get('[data-test="lastName"]').type("QA");
    cy.get('[data-test="postalCode"]').type("37500-000");
    cy.get('[data-test="continue"]').click();
    cy.url().should(
      "equal",
      "https://www.saucedemo.com/checkout-step-two.html",
    );

    cy.get(".cart_list").find(".cart_item").should("have.length", 2);

    cy.contains(".cart_item_label", "Sauce Labs Bike Light")
      .find(".inventory_item_name")
      .should("have.text", "Sauce Labs Bike Light");

    cy.contains(".cart_item_label", "Sauce Labs Onesie")
      .find(".inventory_item_name")
      .should("have.text", "Sauce Labs Onesie");

    cy.get(".summary_subtotal_label").should("have.text", "Item total: $17.98");
    cy.get(".summary_tax_label").should("have.text", "Tax: $1.44");
    cy.get(".summary_total_label").should("have.text", "Total: $19.42");

    cy.get('[data-test="finish"]').click();

    cy.url().should("include", "/checkout-complete.html");

    cy.get(".complete-header")
      .should("be.visible")
      .and("have.text", "Thank you for your order!");

    cy.get(".complete-text").should(
      "contain.text",
      "Your order has been dispatched",
    );
  });
  it("deve remover um produto e verificar o carrinho", () => {
    cy.AddProductChart("Sauce Labs Bolt T-Shirt");
    cy.get('[data-test="shopping-cart-badge"]')
      .should("be.visible")
      .and("have.text", "1");
    cy.removeProduct("Sauce Labs Bolt T-Shirt");
    cy.get('[data-test="shopping-cart-badge"]').should("not.exist");
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').should(
      "have.text",
      "Add to cart",
    );
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get(".cart_item").should("not.exist");
  });
});

describe("deve tentar realizar login", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });
  it("deve impedir login com credenciais incorretas", () => {
    const tentativas = [
      { usuario: "standard", senha: "secret" },
      { usuario: "usuario_inexistente", senha: "secret_sauce" },
      { usuario: "standard_user", senha: "senha_errada" },
    ];

    tentativas.forEach((tentativa) => {
      cy.get('[data-test="username"]').clear();
      cy.get('[data-test="password"]').clear();

      cy.get('[data-test="username"]').type(tentativa.usuario);
      cy.get('[data-test="password"]').type(tentativa.senha);

      cy.get('[data-test="login-button"]').click();

      cy.get('[data-test="error"]')
        .should("be.visible")
        .and("contain.text", "Username and password do not match");
    });
  });
  it("deve impedir o login de um usuário bloqueado", () => {
    cy.get('[data-test="username"]').type("locked_out_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Sorry, this user has been locked out");

    cy.url().should("eq", "https://www.saucedemo.com/");
  });
});

describe("Ordenação de produtos", () => {
  beforeEach(() => {
    cy.Login("standard_user", "secret_sauce");
  });

  it("deve ordenar os produtos do menor para o maior preço", () => {
    cy.get('[data-test="product-sort-container"]').select("lohi");

    cy.get(".inventory_item_price").then(($precos) => {
      const precos = [...$precos].map((elemento) =>
        Number(elemento.innerText.replace("$", "")),
      );
      const precosOrdenados = [...precos].sort((a, b) => a - b);
      expect(precos).to.deep.equal(precosOrdenados);
    });
  });
  it("deve ordenar os produtos do maior para o menor preço", () => {
    cy.get('[data-test="product-sort-container"]').select("hilo");

    cy.get(".inventory_item_price").then(($precos) => {
      const precos = [...$precos].map((elemento) =>
        Number(elemento.innerText.replace("$", "")),
      );

      const precosOrdenados = [...precos].sort((a, b) => b - a);

      expect(precos).to.deep.equal(precosOrdenados);
    });
  });
});

describe("deve verificar se os produtos exibidos na pagina são exatamente os esperados", () => {
  beforeEach(() => {
    cy.Login("standard_user", "secret_sauce");
  });
  it("deve comparar o valor de uma lista extraida com uma lista esperada", () => {
    const list = [
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Bolt T-Shirt",
      "Sauce Labs Fleece Jacket",
      "Sauce Labs Onesie",
      "Test.allTheThings() T-Shirt (Red)",
    ];
    cy.get(".inventory_item_name ").then(($name) => {
      const namesList = [...$name].map((el) => el.innerText);
      console.log("namesList", namesList);
      expect(namesList).to.deep.equal(list);
    });
  });
});

describe("deve validar nome e preço do produto", () => {
  beforeEach(() => {
    cy.Login("standard_user", "secret_sauce");
  });
  it("deve exibir o nome eo preço correto do produto", () => {
    cy.contains(".inventory_item_name", "Sauce Labs Bolt T-Shirt")
      .should("have.text", "Sauce Labs Bolt T-Shirt")
      .click();
    cy.url().should("contain", "inventory-item");
    cy.get(".inventory_details_name").should(
      "have.text",
      "Sauce Labs Bolt T-Shirt",
    );
    cy.get(".inventory_details_desc").should(
      "include.text",
      "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
    );
    cy.get(".inventory_details_price").should("have.text", "$15.99");
  });
});

describe("deve testar as ordenaçoes do titulo", () => {
  beforeEach(() => {
    cy.Login("standard_user", "secret_sauce");
  });
  it("deve testar os titulo em A-Z", () => {
    cy.get(".product_sort_container").select("az");

    cy.get(".inventory_item_name").then(($name) => {
      const namesAZ = [...$name].map((el) => el.innerText);
      console.log("a to az", namesAZ);
      const ordenedAZ = [...namesAZ].sort((a, b) => a.localeCompare(b));
      expect(namesAZ).to.deep.equal(ordenedAZ);
    });
  });
   it("deve testar os titulo em Z-A", () => {
    cy.get(".product_sort_container").select("za");

    cy.get(".inventory_item_name").then(($name) => {
      const namesZA = [...$name].map((el) => el.innerText);
      console.log("a to az", namesZA);
      const ordenedZA = [...namesZA].sort((a, b) => b.localeCompare(a));
      expect(namesZA).to.deep.equal(ordenedZA);
    });
  });
});

describe("deve testar se todos produtos possuem imagens", () => {
  beforeEach(() => {
    cy.Login("standard_user", "secret_sauce");
  });
  it("deve confirmar se existem seis imagens", () => {
    cy.get(".inventory_item_img img")
      .should("have.length", 6)
      .each((img, index) => {
        expect(img[0].complete).to.be.true;
      });
  });
});
