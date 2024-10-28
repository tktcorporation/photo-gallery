import React, { useState } from 'react';
import { Layout } from 'lucide-react';
import PhotoGallery from './components/PhotoGallery';
import VirtualDemo from './components/VirtualDemo';

function App() {
  const [activeView, setActiveView] = useState<'photos' | 'virtual'>('photos');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Layout className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">フォトギャラリー & Virtual Scroll</h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveView('photos')}
                className={`px-4 py-2 rounded-md ${
                  activeView === 'photos'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                写真ギャラリー
              </button>
              <button
                onClick={() => setActiveView('virtual')}
                className={`px-4 py-2 rounded-md ${
                  activeView === 'virtual'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Virtual Scroll
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'photos' ? <PhotoGallery /> : <VirtualDemo />}
      </main>
    </div>
  );
}

export default App;