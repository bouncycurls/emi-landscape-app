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
      client_input: clientInput,
      photo_description: photoDescription,
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
      setResponse('An error occurred');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Generate Landscape Layout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea className="w-full border rounded p-2" placeholder="Client Input" value={clientInput} onChange={e => setClientInput(e.target.value)} />
        <textarea className="w-full border rounded p-2" placeholder="Photo Description" value={photoDescription} onChange={e => setPhotoDescription(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Budget" value={budget} onChange={e => setBudget(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Preferences" value={preferences} onChange={e => setPreferences(e.target.value)} />
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Submit</button>
      </form>
      {response && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Generated Layout:</h2>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{response}</pre>
        </div>
      )}
    </div>
  );
}
