import { Router } from 'express';
import { getAllMaterials, getMaterialsByCategory } from '../controllers/materialsController.js';

const router = Router();

router.get('/', getAllMaterials);
router.get('/:category', getMaterialsByCategory);

export default router;