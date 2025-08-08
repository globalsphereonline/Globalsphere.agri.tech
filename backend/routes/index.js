import { Router } from 'express';
import materialsRouter from './materials.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

router.use('/materials', materialsRouter);

export default router;