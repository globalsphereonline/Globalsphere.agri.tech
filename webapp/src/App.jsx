import React, { useEffect, useState } from 'react';

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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">GLOBAL-SPHERE-AGRI-TECH</h1>
          <span className="text-sm text-gray-600">{apiHealth}</span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card title="Dashboard" description="KPIs, analytics, and AI insights" />
          <Card title="Marketplace" description="Raw materials listings and trades" />
          <Card title="Logistics" description="Shipments, tracking, and compliance" />
          <Card title="Payments" description="Stripe/PayPal integrations" />
          <Card title="Media" description="Photo/video/audio handlers with AI tagging" />
          <Card title="Onboarding" description="Multilingual walkthroughs" />
        </div>
      </main>
    </div>
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