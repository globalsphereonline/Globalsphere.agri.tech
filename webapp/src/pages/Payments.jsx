import React, { useState } from 'react';

const API_BASE = 'http://localhost:4000/api/payments';

export default function Payments() {
  const [amount, setAmount] = useState(1000);
  const [currency, setCurrency] = useState('usd');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  async function callStripe(e) {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/stripe/intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount), currency }),
      });
      const data = await res.json();
      setResult({ provider: 'stripe', data });
    } catch (err) {
      setError('Stripe request failed');
    }
  }

  async function callPaypal(e) {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/paypal/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount) / 100, currency: currency.toUpperCase() }),
      });
      const data = await res.json();
      setResult({ provider: 'paypal', data });
    } catch (err) {
      setError('PayPal request failed');
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Payments</h2>
      <form className="flex flex-wrap items-end gap-3">
        <label className="text-sm">
          <span className="mb-1 block text-gray-700">Amount (minor units)</span>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-48 rounded border px-3 py-2" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-gray-700">Currency</span>
          <input value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-32 rounded border px-3 py-2" />
        </label>
        <div className="flex gap-2">
          <button onClick={callStripe} className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Stripe Intent</button>
          <button onClick={callPaypal} className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">PayPal Order</button>
        </div>
      </form>
      {error && <div className="text-sm text-red-600">{error}</div>}
      {result && (
        <pre className="overflow-auto rounded border bg-gray-50 p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}