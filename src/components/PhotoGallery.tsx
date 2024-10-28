import React, { useState, useMemo } from 'react';
import { generatePhotos } from '../data/photos';
import PhotoGrid from './PhotoGrid';
import SearchBar from './SearchBar';
import PhotoModal from './PhotoModal';
import { Photo } from '../types/photo';

const PhotoGallery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const allPhotos = useMemo(() => generatePhotos(), []);

  const filteredPhotos = useMemo(() => {
    if (!searchQuery) return allPhotos;
    
    const query = searchQuery.toLowerCase();
    return allPhotos.filter(photo => 
      photo.title.toLowerCase().includes(query) ||
      photo.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [allPhotos, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">写真一覧</h2>
        <SearchBar onSearch={setSearchQuery} />
      </div>
      <PhotoGrid 
        photos={filteredPhotos} 
        onPhotoSelect={setSelectedPhoto}
      />
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
};

export default PhotoGallery;