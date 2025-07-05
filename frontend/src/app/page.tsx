'use client'

import { useAuth } from '../../components/SupabaseProvider'
import Link from 'next/link'

export default function HomePage() {
  const { session, user, signOut, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-600">🪴 EMI Landscape</h1>
            </div>
            
            <nav className="flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              
              {session ? (
                <>
                  <Link
                    href="/generate"
                    className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Generate
                  </Link>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      {user?.email}
                    </span>
                    <button
                      onClick={signOut}
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  href="/auth"
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Design Your Dream Outdoor Space
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Transform your landscape with professional design expertise. Our AI-powered layout generator 
            helps you create beautiful, functional outdoor spaces tailored to your vision and budget.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session ? (
              <Link
                href="/generate"
                className="inline-flex items-center px-8 py-4 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                🚀 Launch Generator
              </Link>
            ) : (
              <>
                <Link
                  href="/auth"
                  className="inline-flex items-center px-8 py-4 bg-green-600 text-white text-lg font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="/generate"
                  className="inline-flex items-center px-8 py-4 border-2 border-green-600 text-green-600 text-lg font-medium rounded-lg hover:bg-green-50 transition-colors"
                >
                  Try Demo
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">🌿</div>
            <h3 className="text-xl font-semibold mb-2">Professional Design</h3>
            <p className="text-gray-600">
              Expert landscape design using USDA Zone 6 guidelines and professional best practices.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-2">Budget-Friendly</h3>
            <p className="text-gray-600">
              Get accurate cost estimates and design options that fit your budget and preferences.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-4xl mb-4">📐</div>
            <h3 className="text-xl font-semibold mb-2">Detailed Layouts</h3>
            <p className="text-gray-600">
              Receive zone-based layouts with dimensions, plant recommendations, and material lists.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
