// bills-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'bills';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    billerBillID: { type: String, auto: true },
    platformBillID: { type: String, required: true },
    paymentDetails: {
      type: Schema.Types.Mixed
    },
    receipt: {
      'date': { type: Date },
      'id': { type: String }
    },
     customerAccount: {
       'id': { type: String }
     },
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
