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

  const initialPixelRatio = window.devicePixelRatio;
  // Set to an unlikely value to ensure that the override is working
  const calibrationPixelRatio = 0.1;

  return overrideDeviceScaleFactor(calibrationPixelRatio)
    .then(() => cy.waitUntil(() => cy.wrap(window.devicePixelRatio.toFixed(3)).should('not.eq', initialPixelRatio.toFixed(3))))
    .then(() => overrideDeviceScaleFactor(pixelRatio / window.devicePixelRatio * calibrationPixelRatio))
    .then(() => cy.waitUntil(()=> cy.wrap(window.devicePixelRatio.toFixed(3)).should('eq', pixelRatio.toFixed(3)), { interval: 10 }));
});
