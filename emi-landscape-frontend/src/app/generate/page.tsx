'use client';
import { useState } from 'react';

export default function GeneratePage() {
  const [clientInput, setClientInput] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [preferences, setPreferences] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('https://emi-landscape-backend.replit.app/generate-layout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ clientInput, photoDescription, budget, preferences })
      });
      const data = await res.text();
      setResult(data);
    } catch (err) {
      setResult('Error generating layout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">Generate Layout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Client Input</label>
          <textarea
            className="w-full border rounded p-2"
            value={clientInput}
            onChange={(e) => setClientInput(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Photo Description</label>
          <textarea
            className="w-full border rounded p-2"
            value={photoDescription}
            onChange={(e) => setPhotoDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Budget</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Preferences</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Submit'}
        </button>
      </form>
      {result && (
        <div className="mt-6 whitespace-pre-wrap border p-4 rounded bg-gray-100">
          {result}
        </div>
      )}
    </main>
  );
}
