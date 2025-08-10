import Stripe from 'stripe';
import paypal from '@paypal/checkout-server-sdk';

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: '2023-10-16' });
}

function getPaypalClient() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;
  const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
  return new paypal.core.PayPalHttpClient(environment);
}

export async function createStripeIntent(req, res) {
  try {
    const { amount, currency = 'usd' } = req.body;
    const stripe = getStripe();
    if (!stripe) {
      return res.json({ mock: true, clientSecret: 'pi_mock_secret', amount, currency });
    }
    const intent = await stripe.paymentIntents.create({ amount, currency, automatic_payment_methods: { enabled: true } });
    res.json({ clientSecret: intent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create intent' });
  }
}

export async function createPaypalOrder(req, res) {
  try {
    const { amount, currency = 'USD' } = req.body;
    const client = getPaypalClient();
    if (!client) {
      return res.json({ mock: true, id: 'PAYPAL_ORDER_MOCK', approveUrl: 'https://example.com/approve' });
    }
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{ amount: { currency_code: currency, value: String(amount) } }],
      application_context: { return_url: 'https://example.com/success', cancel_url: 'https://example.com/cancel' },
    });
    const order = await client.execute(request);
    const approveLink = order.result.links?.find((l) => l.rel === 'approve')?.href;
    res.json({ id: order.result.id, approveUrl: approveLink });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create order' });
  }
}