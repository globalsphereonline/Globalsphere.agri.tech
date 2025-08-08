import { Material } from '../models/Material.js';

export async function listMaterials(req, res) {
  try {
    const { q, category, sort = '-createdAt', page = 1, limit = 20 } = req.query;
    const filters = {};
    if (category) filters.category = category;
    let query = Material.find(filters);
    if (q) {
      query = query.find({ $text: { $search: q } });
    }
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const [items, total] = await Promise.all([
      query
        .sort(sort)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .lean(),
      Material.countDocuments(q ? { ...filters, $text: { $search: q } } : filters),
    ]);
    res.json({ items, total, page: pageNum, limit: limitNum });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list materials' });
  }
}

export async function createMaterial(req, res) {
  try {
    const payload = req.body;
    if (req.files && Array.isArray(req.files)) {
      payload.mediaUrls = req.files.map((f) => `/uploads/${f.filename}`);
    }
    const created = await Material.create(payload);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create material' });
  }
}

export async function getMaterial(req, res) {
  try {
    const { id } = req.params;
    const item = await Material.findById(id).lean();
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to fetch material' });
  }
}

export async function updateMaterial(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      payload.mediaUrls = req.files.map((f) => `/uploads/${f.filename}`);
    }
    const updated = await Material.findByIdAndUpdate(id, payload, { new: true }).lean();
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to update material' });
  }
}

export async function deleteMaterial(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Material.findByIdAndDelete(id).lean();
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to delete material' });
  }
}