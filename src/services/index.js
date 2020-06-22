const users = require('./users/users.service.js');
const customers = require('./customers/customers.service.js');
const billsFetch = require('./bills-fetch/bills-fetch.service.js');
const bills = require('./bills/bills.service.js');
const billsFetchReceipt = require('./bills-fetch-receipt/bills-fetch-receipt.service.js');
const receipts = require('./receipts/receipts.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(customers);
  app.configure(billsFetch);
  app.configure(bills);
  app.configure(billsFetchReceipt);
  app.configure(receipts);
};
