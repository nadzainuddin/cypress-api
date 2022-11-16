const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl : 'https://api.bnm.gov.my/public/bih',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
})