const app = require('../../src/app');

describe('\'bills-fetch-receipt\' service', () => {
  it('registered the service', () => {
    const service = app.service('bills-fetch-receipt');
    expect(service).toBeTruthy();
  });
});
