import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API_BASE } from '../config.js';

export default function Marketplace() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (category) params.set('category', category);
    fetch(`${API_BASE}/materials?${params.toString()}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data.items) ? data.items : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [search, category]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">{t('marketplace')}</h2>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search materials..."
            className="w-64 rounded border px-3 py-2 text-sm focus:outline-none focus:ring"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded border px-3 py-2 text-sm"
          >
            <option value="">All categories</option>
            <option value="agriculture">Agriculture</option>
            <option value="minerals">Minerals</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-gray-600">{t('loading')}</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <div key={idx} className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm uppercase tracking-wide text-gray-500">{item.category}</div>
                <div className="text-xs text-gray-400">{item.unit}</div>
              </div>
              <div className="mt-1 text-lg font-medium">{item.item}</div>
              <div className="mt-1 text-sm text-gray-600">
                {item.grade ? `Grade: ${item.grade}` : item.purity ? `Purity: ${item.purity}` : null}
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-sm text-gray-600">{t('noResults')}</div>
          )}
        </div>
      )}
    </div>
  );
}