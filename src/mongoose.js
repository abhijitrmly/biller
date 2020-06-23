const mongoose = require('mongoose');
// const logger = require('./logger');
// DB Config
const db = require('../config/keys').mongoURI;

module.exports = function (app) {

  // Connect to MongoDB
  mongoose
    .connect(
      db,
      { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => console.log(err));

  // mongoose.connect(
  //   app.get('mongodb'),
  //   { useCreateIndex: true, useNewUrlParser: true }
  // ).catch(err => {
  //   logger.error(err);
  //   process.exit(1);
  // });

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
