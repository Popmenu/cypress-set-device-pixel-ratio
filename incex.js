Cypress.Commands.add('setDevicePixelRatio', (pixelRatio) => {
  const overrideDeviceScaleFactor = scaleFactor => cy.wrap(Cypress.automation('remote:debugger:protocol', {
    command: 'Emulation.setDeviceMetricsOverride',
    params: {
      deviceScaleFactor: scaleFactor,
      // width and height set to 0 remove overrides
      height: 0,
      width: 0,
    },
  }));

  return overrideDeviceScaleFactor(1).then(() => overrideDeviceScaleFactor(pixelRatio / window.devicePixelRatio));
});
