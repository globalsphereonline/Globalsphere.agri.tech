import React, { useEffect, useMemo, useState } from 'react';

const API_BASE = 'http://localhost:4000/api';

function fetchWithTimeout(resource, options = {}, timeoutMs = 1500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(resource, { ...options, signal: controller.signal }).finally(() => clearTimeout(id));
}

export default function ManageMaterials() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState('-createdAt');
  const [total, setTotal] = useState(0);

  const [form, setForm] = useState({
    category: 'agriculture',
    item: '',
    unit: 'ton',
    grade: '',
    purity: '',
    description: '',
    pricePerUnit: '',
    media: [],
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (files) {
      setForm((f) => ({ ...f, media: Array.from(files) }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  async function fetchItems() {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit), sort });
      const res = await fetchWithTimeout(`${API_BASE}/v2/materials?${params.toString()}`);
      if (!res.ok) throw new Error('v2 unavailable');
      const data = await res.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (e) {
      // fallback to legacy JSON (no pagination)
      try {
        const res = await fetchWithTimeout(`${API_BASE}/materials`);
        const data = await res.json();
        setItems(data.items || []);
        setTotal((data.items || []).length);
      } catch (err) {
        setError('Failed to load materials');
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, [page, limit, sort]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'media') {
        value.forEach((file) => body.append('media', file));
      } else if (value !== '') {
        body.append(key, value);
      }
    });
    try {
      const res = await fetchWithTimeout(`${API_BASE}/v2/materials`, {
        method: 'POST',
        body,
      }, 4000);
      if (!res.ok) throw new Error('create failed');
      setForm({ category: 'agriculture', item: '', unit: 'ton', grade: '', purity: '', description: '', pricePerUnit: '', media: [] });
      await fetchItems();
    } catch (err) {
      setError('Create failed (DB not connected?)');
    }
  }

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

  return (
    <div className="space-y-8">
      <section className="rounded-lg border bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Create Material</h2>
        <form className="mt-4 grid gap-3 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="text-sm">
            <span className="mb-1 block text-gray-700">Category</span>
            <select name="category" value={form.category} onChange={handleChange} className="w-full rounded border px-3 py-2">
              <option value="agriculture">Agriculture</option>
              <option value="minerals">Minerals</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-gray-700">Item</span>
            <input name="item" value={form.item} onChange={handleChange} className="w-full rounded border px-3 py-2" required />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-gray-700">Unit</span>
            <input name="unit" value={form.unit} onChange={handleChange} className="w-full rounded border px-3 py-2" required />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-gray-700">Grade</span>
            <input name="grade" value={form.grade} onChange={handleChange} className="w-full rounded border px-3 py-2" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-gray-700">Purity</span>
            <input name="purity" value={form.purity} onChange={handleChange} className="w-full rounded border px-3 py-2" />
          </label>
          <label className="text-sm sm:col-span-2">
            <span className="mb-1 block text-gray-700">Description</span>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full rounded border px-3 py-2" rows={3} />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-gray-700">Price per Unit</span>
            <input type="number" step="0.01" name="pricePerUnit" value={form.pricePerUnit} onChange={handleChange} className="w-full rounded border px-3 py-2" />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-gray-700">Media</span>
            <input type="file" multiple name="media" onChange={handleChange} className="w-full" />
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Create</button>
            {error && <span className="ml-3 text-sm text-red-600">{error}</span>}
          </div>
        </form>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Materials</h2>
          <div className="flex items-center gap-2 text-sm">
            <label>
              Sort:
              <select className="ml-2 rounded border px-2 py-1" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="-createdAt">Newest</option>
                <option value="createdAt">Oldest</option>
                <option value="item">Item A-Z</option>
                <option value="-item">Item Z-A</option>
              </select>
            </label>
            <label>
              Page size:
              <select className="ml-2 rounded border px-2 py-1" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </label>
          </div>
        </div>
        {loading ? (
          <div className="text-sm text-gray-600">Loading...</div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item, idx) => (
                <div key={item._id || idx} className="rounded-lg border bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-sm uppercase tracking-wide text-gray-500">{item.category}</div>
                    <div className="text-xs text-gray-400">{item.unit}</div>
                  </div>
                  <div className="mt-1 text-lg font-medium">{item.item}</div>
                  <div className="mt-1 text-sm text-gray-600">
                    {item.grade ? `Grade: ${item.grade}` : item.purity ? `Purity: ${item.purity}` : null}
                  </div>
                  {Array.isArray(item.mediaUrls) && item.mediaUrls.length > 0 && (
                    <img src={`http://localhost:4000${item.mediaUrls[0]}`} alt="media" className="mt-2 h-28 w-full rounded object-cover" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="rounded border px-3 py-1 disabled:opacity-50">Prev</button>
              <span>Page {page} / {totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className="rounded border px-3 py-1 disabled:opacity-50">Next</button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}