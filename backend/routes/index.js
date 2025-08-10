import { Router } from 'express';
import materialsRouter from './materials.js';
import materialsDbRouter from './materialsDb.js';
import paymentsRouter from './payments.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

router.use('/materials', materialsRouter);
router.use('/v2/materials', materialsDbRouter);
router.use('/payments', paymentsRouter);

export default router;