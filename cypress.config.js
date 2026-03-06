const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  allowCypressEnv: true,
  chromeWebSecurity: false,
  viewportWidth: 1920,
  viewportHeight: 1080,

  e2e: {
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
