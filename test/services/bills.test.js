const app = require('../../src/app');

describe('\'bills\' service', () => {
  it('registered the service', () => {
    const service = app.service('bills');
    expect(service).toBeTruthy();
  });
});
