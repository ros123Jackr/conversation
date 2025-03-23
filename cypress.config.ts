import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents: (on, config) => {
      let isDev = config.watchForFileChanges;
      let port = process.env.PORT ?? (isDev ? "3000" : "8811");
      let configOverrides: Partial<Cypress.PluginConfigOptions> = {
        baseUrl: `http://localhost:${port}`,
        screenshotOnRunFailure: !process.env.CI,
      };

      // To use this:
      // cy.task('log', whateverYouWantInTheTerminal)
      on("task", {
        log: (message) => {
          console.log(message);

          return null;
        },
      });

      return { ...config, ...configOverrides };
    },
  },
});
