const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://automationexercise.com",
    pageLoadTimeout: 60000, // Aumenta a tolerância para páginas lentas
    chromeWebSecurity: false, // Desativa restrições de segurança web que causam travamentos
    blockHosts: [
      "*.pagead2.googlesyndication.com",
      "*.g.doubleclick.net",
      "*.google-analytics.com",
      "*.google-analytics.l.google.com",
      "*.googlesyndication.com",
      "*.googletagservices.com"
    ],
    setupNodeEvents(on, config) {
      // implemente listeners de eventos se necessário
    },
  },
});