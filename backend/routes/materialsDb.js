import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createMaterial, deleteMaterial, getMaterial, listMaterials, updateMaterial } from '../controllers/materialsDbController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  },
});

const upload = multer({ storage });

const router = Router();

router.get('/', listMaterials);
router.get('/:id', getMaterial);
router.post('/', upload.array('media', 5), createMaterial);
router.put('/:id', upload.array('media', 5), updateMaterial);
router.delete('/:id', deleteMaterial);

export default router;