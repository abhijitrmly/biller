// Initializes the `bills-fetch` service on path `/bills-fetch`
const { BillsFetch } = require('./bills-fetch.class');
const createModel = require('../../models/bills-fetch.model');
const hooks = require('./bills-fetch.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/bills/fetch', new BillsFetch(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('bills/fetch');

  service.hooks(hooks);
};
