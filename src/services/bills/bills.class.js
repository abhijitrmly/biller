const { Service } = require('feathers-mongoose');

exports.Bills = class Bills extends Service {
  setup(app) {
    this.app = app;
  }
};
