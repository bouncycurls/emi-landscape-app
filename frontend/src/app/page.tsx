export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold mb-4">🪴 EMI Landscape App</h1>
      <p className="text-lg text-gray-700 mb-6">Design your dream outdoor space with ease.</p>
      <a href="/generate" className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700">
        Launch Generator
      </a>
    </main>
  );
}
