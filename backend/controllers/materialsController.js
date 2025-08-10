import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.resolve(__dirname, '..', 'raw_materials.json');

export async function getAllMaterials(req, res) {
  try {
    const content = await fs.readFile(dataPath, 'utf-8');
    const materials = JSON.parse(content);

    const { q, category } = req.query;
    let filtered = materials;

    if (category) {
      filtered = filtered.filter((m) => m.category === String(category));
    }

    if (q) {
      const query = String(q).toLowerCase();
      filtered = filtered.filter((m) =>
        Object.values(m).some((v) => String(v).toLowerCase().includes(query))
      );
    }

    res.json({ count: filtered.length, items: filtered });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load materials' });
  }
}

export async function getMaterialsByCategory(req, res) {
  try {
    const category = req.params.category;
    const content = await fs.readFile(dataPath, 'utf-8');
    const materials = JSON.parse(content);
    const filtered = materials.filter((m) => m.category === String(category));
    res.json({ count: filtered.length, items: filtered });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load materials' });
  }
}