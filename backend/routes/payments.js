import { Router } from 'express';
import { createStripeIntent, createPaypalOrder } from '../controllers/paymentsController.js';

const router = Router();

router.post('/stripe/intent', createStripeIntent);
router.post('/paypal/order', createPaypalOrder);

export default router;