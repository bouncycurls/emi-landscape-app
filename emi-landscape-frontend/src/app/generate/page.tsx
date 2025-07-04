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
    try {
      const res = await fetch('https://emi-landscape-backend.replit.app/generate-layout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientInput,
          photoDescription,
          budget,
          preferences,
        }),
      });
      const data = await res.json();
      setResponse(data.response || JSON.stringify(data));
    } catch (err) {
      console.error(err);
      setResponse('An error occurred');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Layout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Client Input</label>
          <textarea
            value={clientInput}
            onChange={(e) => setClientInput(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Photo Description</label>
          <textarea
            value={photoDescription}
            onChange={(e) => setPhotoDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Budget</label>
          <input
            type="text"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Preferences</label>
          <input
            type="text"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Submit
        </button>
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
