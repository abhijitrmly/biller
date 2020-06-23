const { Service } = require('feathers-mongoose');

exports.BillsFetchReceipt = class BillsFetchReceipt extends Service {
  setup(app) {
    this.app = app;
  }

  // Ignoring customer identifiers as per the instruction in test document
  async create(data) {
    const { billerBillID = '', paymentDetails = {} } = data;

    // create a receipt with the billerBillID and payment details
    const receiptCreateResponse = await this.app.service('receipts').create({
      billerBillID,
      paymentDetails,
    });

    const { _id: id = '' } = receiptCreateResponse;

    // find id of the bill for which payment was made
    const billResponseData = await this.app.service('bills').find({
      query: {
        billerBillID,
        $limit: 1,
      }
    });

    if (billResponseData.total === 0) {
      return {
        error: { detail: 'Bill not found' },
        status: 404,
        success: true
      };
    }

    const { data: billData = {} } = billResponseData;
    const [targetBill = {}] = billData;
    const { _id: targetBillId } = targetBill;

    // update bill with payment and receipt
    const billPatchResponse = await this.app.service('bills').patch(targetBillId, {
      paymentDetails,
      receipt: {
        id,
        date: new Date(),
      }
    });

    const { receipt = {} } = billPatchResponse;

    //return receipt in the required format
    return {
      data: { receipt },
      status: 0,
      success: true
    };
  }
};
