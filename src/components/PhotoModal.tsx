import React from 'react';
import { X, Download, Tag } from 'lucide-react';
import { Photo } from '../types/photo';
import ProgressiveImage from './ProgressiveImage';

interface PhotoModalProps {
  photo: Photo;
  onClose: () => void;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ photo, onClose }) => {
  // フルサイズ画像のURL生成
  const fullSizeUrl = `${photo.url}?w=1920&q=80&fit=crop`;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose} />
        
        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-7xl sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4 z-10">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* 画像エリア */}
            <div className="lg:flex-grow">
              <div className="relative h-[50vh] lg:h-[80vh] w-full">
                <ProgressiveImage
                  src={fullSizeUrl}
                  alt={photo.title}
                  className="w-full h-full object-contain bg-black"
                  loading="eager"
                  fetchpriority="high"
                />
              </div>
            </div>

            {/* 詳細情報エリア */}
            <div className="w-full lg:w-96 p-6 bg-white">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{photo.title}</h2>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">タグ</h3>
                  <div className="flex flex-wrap gap-2">
                    {photo.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                      >
                        <Tag className="h-4 w-4 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <a
                    href={fullSizeUrl}
                    download
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    フル解像度でダウンロード
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;