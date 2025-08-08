import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Dashboard from './pages/Dashboard.jsx';
import Marketplace from './pages/Marketplace.jsx';
import ManageMaterials from './pages/ManageMaterials.jsx';
import Payments from './pages/Payments.jsx';

export default function App() {
  const [apiHealth, setApiHealth] = useState('checking...');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const controller = new AbortController();
    fetch('http://localhost:4000/api/health', { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => setApiHealth(`API ${data.status}`))
      .catch(() => setApiHealth('unreachable'));
    return () => controller.abort();
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
            <Link to="/" className="text-xl font-semibold">{t('appTitle')}</Link>
            <nav className="flex items-center gap-4 text-sm">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'font-medium text-blue-600' : 'text-gray-700'}>
                {t('dashboard')}
              </NavLink>
              <NavLink to="/marketplace" className={({ isActive }) => isActive ? 'font-medium text-blue-600' : 'text-gray-700'}>
                {t('marketplace')}
              </NavLink>
              <NavLink to="/manage" className={({ isActive }) => isActive ? 'font-medium text-blue-600' : 'text-gray-700'}>
                Manage
              </NavLink>
              <NavLink to="/payments" className={({ isActive }) => isActive ? 'font-medium text-blue-600' : 'text-gray-700'}>
                Payments
              </NavLink>
              <select
                aria-label="language"
                className="rounded border px-2 py-1 text-xs"
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                <option value="en">EN</option>
                <option value="fr">FR</option>
              </select>
              <span className="text-gray-500 hidden sm:inline">{apiHealth}</span>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/manage" element={<ManageMaterials />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function Card({ title, description }) {
  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  );
}