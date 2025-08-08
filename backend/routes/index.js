import { Router } from 'express';
import materialsRouter from './materials.js';
import materialsDbRouter from './materialsDb.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

router.use('/materials', materialsRouter);
router.use('/v2/materials', materialsDbRouter);

export default router;