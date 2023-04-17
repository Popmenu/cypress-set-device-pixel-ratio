import 'cypress-wait-until';

interface Options {
  mobile: boolean;
  width: number;
  height: number;
};

declare global {
  namespace Cypress {
    interface Chainable {
      setDevicePixelRatio(pixelRatio: number, options?: Options): void;
    }
  }
} 

Cypress.Commands.add('setDevicePixelRatio', (pixelRatio: number, options: Options = {
  mobile: false,
  width: 0,
  height: 0,
}) => {
  const overrideDeviceScaleFactor = (scaleFactor: number) => cy.wrap(Cypress.automation('remote:debugger:protocol', {
    command: 'Emulation.setDeviceMetricsOverride',
    params: {
      deviceScaleFactor: scaleFactor,
      // width and height set to 0 remove overrides
      ...options
    },
  }));

  return overrideDeviceScaleFactor(1)
    .then(() => overrideDeviceScaleFactor(pixelRatio / window.devicePixelRatio))
    .then(() => cy.waitUntil(()=> {
      return cy.wrap(window.devicePixelRatio).should('eq', pixelRatio);
    }, { interval: 10 }));
});
