const app = require('../../src/app');

describe('\'bills-fetch\' service', () => {
  it('registered the service', () => {
    const service = app.service('bills-fetch');
    expect(service).toBeTruthy();
  });
});
