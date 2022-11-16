const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl : 'https://disease.sh/v3/covid-19',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
})