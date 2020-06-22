const { Service } = require('feathers-mongoose');

exports.BillsFetch = class BillsFetch extends Service {
  setup(app) {
    this.app = app;
  }

  async create(data) {
    const { customerIdentifiers = [] } = data;
    const [customerDataQuery = {}] = customerIdentifiers;
    const { attributeName = '', attributeValue = '' } = customerDataQuery;

    // throw an error if the details are incomplete
    if (!attributeName || !attributeValue) {
      throw 'Payer parameters are incomplete';
    }

    // get customer data based on attribute name and value
    const customerResponse = await this.app.service('customers').find({
      query: customerDataQuery
    });

    // if no customer exists, send appropriate response
    if (customerResponse.total === 0) {
      return {
        'status'  : 404,
        'success' : false,
        'error' : {
          'code'    : 'customer-not-found',
          'title'   : 'Customer not found',
          'detail'  : 'The requested customer was not found in the biller system.',
          'traceID' : '',
          'docURL'  : ''
        }
      };
    }

    const  { data: customerResponseData = [] } = customerResponse;
    const [customerData = {}] = customerResponseData;
    const { _id: customerId = '', name: customerName = '' } = customerData;

    // fetch all bills for this customer
    const billsResponse = await this.app.service('bills').find({
      query: {
        'customerAccount.id': customerId,
      }
    });

    // if no outstanding bills for this customer, send appropriate response
    if (billsResponse.total === 0) {
      return {
        'status' : 200,
        'success': true,
        'data' : {
          'customer' : {
            'name' : customerName,
          },
          'billDetails' : {
            'billFetchStatus' : 'NO_OUTSTANDING',
            'bills'           : []
          }
        }
      };
    }

    // if bills exists, return an array of all outstanding bills
    return {
      'status'  : 200,
      'success' : true,
      'data' : {
        'customer' : {
          'name' : customerName,
        },
        'billDetails' : {
          'billFetchStatus' : 'AVAILABLE',
          'bills'           : billsResponse.data,
        }
      }
    };
  }
};
