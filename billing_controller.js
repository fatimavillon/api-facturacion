const express = require('express');
const router = express.Router();
const billingService = require('./billing_service');

router.post('/invoices', async (req, res) => {
  const tenantId = req.headers['tenant-id'];
  const { order_id, payment_details } = req.body;

  if (!tenantId || !order_id || !payment_details) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  try {
    const invoice = await billingService.generateInvoice(tenantId, order_id, payment_details);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/invoices/:invoice_id', async (req, res) => {
  const tenantId = req.headers['tenant-id'];
  const { invoice_id } = req.params;
  try {
    const invoice = await billingService.getInvoice(tenantId, invoice_id);
    if (invoice) res.json(invoice);
    else res.status(404).json({ message: 'Invoice not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/invoices', async (req, res) => {
  const tenantId = req.headers['tenant-id'];

  try {
    const invoices = await billingService.listInvoices(tenantId);
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
