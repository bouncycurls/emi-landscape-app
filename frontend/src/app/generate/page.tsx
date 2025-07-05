'use client';
import { useState } from 'react';

export default function GeneratePage() {
  const [clientInput, setClientInput] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [preferences, setPreferences] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      clientInput,
      photoDescription,
      budget,
      preferences,
    };
    try {
      const res = await fetch('https://emi-landscape-backend.bouncycurls.replit.app/generate-layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResponse(data.layout || JSON.stringify(data));
    } catch (err) {
      console.error(err);
      setResponse('An error occurred.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Layout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea value={clientInput} onChange={(e) => setClientInput(e.target.value)} placeholder="Client Input" className="w-full p-2 border rounded" />
        <textarea value={photoDescription} onChange={(e) => setPhotoDescription(e.target.value)} placeholder="Photo Description" className="w-full p-2 border rounded" />
        <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget" className="w-full p-2 border rounded" />
        <input type="text" value={preferences} onChange={(e) => setPreferences(e.target.value)} placeholder="Preferences" className="w-full p-2 border rounded" />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
      </form>
      {response && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Response</h2>
          <pre className="p-4 bg-gray-100 whitespace-pre-wrap">{response}</pre>
        </div>
      )}
    </div>
  );
}
