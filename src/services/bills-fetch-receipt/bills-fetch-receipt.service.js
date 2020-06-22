// Initializes the `bills-fetch-receipt` service on path `/bills-fetch-receipt`
const { BillsFetchReceipt } = require('./bills-fetch-receipt.class');
const createModel = require('../../models/bills-fetch-receipt.model');
const hooks = require('./bills-fetch-receipt.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/bill/fetchReceipt', new BillsFetchReceipt(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('bill/fetchReceipt');

  service.hooks(hooks);
};
