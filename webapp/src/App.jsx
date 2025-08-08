import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Marketplace from './pages/Marketplace.jsx';

export default function App() {
  const [apiHealth, setApiHealth] = useState('checking...');

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
            <Link to="/" className="text-xl font-semibold">GLOBAL-SPHERE-AGRI-TECH</Link>
            <nav className="flex items-center gap-4 text-sm">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'font-medium text-blue-600' : 'text-gray-700'}>
                Dashboard
              </NavLink>
              <NavLink to="/marketplace" className={({ isActive }) => isActive ? 'font-medium text-blue-600' : 'text-gray-700'}>
                Marketplace
              </NavLink>
              <span className="text-gray-500">{apiHealth}</span>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/marketplace" element={<Marketplace />} />
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