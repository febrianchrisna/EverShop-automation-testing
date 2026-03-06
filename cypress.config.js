const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  allowCypressEnv: true,
  chromeWebSecurity: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 8000,
  retries: {
    runMode: 2,
    openMode: 0,
  },

  e2e: {
      specPattern: [
        'cypress/e2e/TC01/**/*.cy.{js,jsx,ts,tsx}',
        'cypress/e2e/TC02/**/*.cy.{js,jsx,ts,tsx}',
        'cypress/e2e/TC03/**/*.cy.{js,jsx,ts,tsx}',
        'cypress/e2e/TC04/**/*.cy.{js,jsx,ts,tsx}',
        'cypress/e2e/TC05/**/*.cy.{js,jsx,ts,tsx}',
        'cypress/e2e/TC06/**/*.cy.{js,jsx,ts,tsx}',
        'cypress/e2e/TC07/**/*.cy.{js,jsx,ts,tsx}',
      ],
      reporter: 'mochawesome',
      reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: true,
      json: true,
    },
    baseUrl: "https://demo.evershop.io",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config);
      return config;
    },
  },
});
