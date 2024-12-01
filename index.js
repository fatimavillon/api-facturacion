const express = require('express');
const serverless = require('serverless-http');
const billingRoutes = require('./routes/billing_routes');

const app = express();
app.use(express.json());
app.use('/billing', billingRoutes);

module.exports.handler = serverless(app);
