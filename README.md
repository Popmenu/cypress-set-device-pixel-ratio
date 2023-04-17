A Cypress custom command to set `window.devicePixelRatio` by adjusting `Emulation.setDeviceMetricsOverride`.

## Installation

```bash
npm install --save-dev cypress-set-device-pixel-ratio
# or
yarn add --dev cypress-set-device-pixel-ratio
```

## Usage
1. In your Cypress commands.js file, import the package:
```javascript
import 'cypress-set-device-pixel-ratio';
```
2. Use the cy.setDevicePixelRatio() command in your Cypress tests:
```javascript
describe('Test suite', () => {
  it('Test case', () => {
    cy.setDevicePixelRatio(2);
    // Or
    cy.setDevicePixelRatio(2, {
      mobile: true;
      width: 375;
      height: 667;
    });
    // your test steps
  });
});
```
