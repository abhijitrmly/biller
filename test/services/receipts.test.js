const app = require('../../src/app');

describe('\'receipts\' service', () => {
  it('registered the service', () => {
    const service = app.service('receipts');
    expect(service).toBeTruthy();
  });
});
