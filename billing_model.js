const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "Facturas";

const getInvoiceById = async (tenant_id, invoice_id) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      tenant_id,
      invoice_id,
    },
  };
  const result = await dynamoDB.get(params).promise();
  return result.Item;
};

const createInvoice = async (invoice) => {
  const params = {
    TableName: TABLE_NAME,
    Item: invoice,
  };
  await dynamoDB.put(params).promise();
  return invoice.invoice_id;
};

const queryInvoices = async (tenant_id) => {
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: "tenant_id = :tenant_id",
    ExpressionAttributeValues: {
      ":tenant_id": tenant_id,
    },
  };
  const result = await dynamoDB.query(params).promise();
  return result.Items;
};

module.exports = {
  getInvoiceById,
  createInvoice,
  queryInvoices,
};
