const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME;

async function generateInvoice(tenantId, orderId, paymentDetails) {
  const invoiceId = `invoice_${Date.now()}`;
  const invoice = {
    tenant_id: tenantId,
    invoice_id: invoiceId,
    order_id: orderId,
    created_at: new Date().toISOString(),
    payment_details: paymentDetails,
    status: 'PAID',
  };

  await dynamoDb.put({ TableName: TABLE_NAME, Item: invoice }).promise();
  return invoice;
}

async function getInvoice(tenantId, invoiceId) {
  const params = {
    TableName: TABLE_NAME,
    Key: { tenant_id: tenantId, invoice_id: invoiceId },
  };
  const result = await dynamoDb.get(params).promise();
  return result.Item;
}

async function listInvoices(tenantId) {
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'tenant_id = :tenantId',
    ExpressionAttributeValues: { ':tenantId': tenantId },
  };
  const result = await dynamoDb.query(params).promise();
  return result.Items;
}

module.exports = { generateInvoice, getInvoice, listInvoices };
