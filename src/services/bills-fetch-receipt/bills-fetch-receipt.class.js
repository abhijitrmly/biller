const { Service } = require('feathers-mongoose');

exports.BillsFetchReceipt = class BillsFetchReceipt extends Service {
  setup(app) {
    this.app = app;
  }

  // TODO add create method for POST requests on bills/fetchReceipt api
};
