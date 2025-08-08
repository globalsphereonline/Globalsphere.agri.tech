import React from 'react';

export default function Dashboard() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card title="Dashboard" description="KPIs, analytics, and AI insights" />
      <Card title="Marketplace" description="Raw materials listings and trades" />
      <Card title="Logistics" description="Shipments, tracking, and compliance" />
      <Card title="Payments" description="Stripe/PayPal integrations" />
      <Card title="Media" description="Photo/video/audio handlers with AI tagging" />
      <Card title="Onboarding" description="Multilingual walkthroughs" />
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