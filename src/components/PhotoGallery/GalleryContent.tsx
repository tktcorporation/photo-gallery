import React, { memo, useRef } from 'react';
import { Photo } from '../../types/photo';
import PhotoGrid from '../PhotoGrid';
import LocationGroupHeader from '../LocationGroupHeader';
import { useGroupInView } from './useGroupInView';
import { usePhotoSource } from '../../hooks/usePhotoSource';
import { usePullToRefresh } from '../../hooks/usePullToRefresh';
import { RefreshCw } from 'lucide-react';

interface GroupedPhotos {
  photos: Photo[];
  location: string;
  date: string;
  locationDetail: any;
}

interface GalleryContentProps {
  groupedPhotos: { [key: string]: GroupedPhotos };
  onPhotoSelect: (photo: Photo) => void;
}

const GalleryContent = memo(({ groupedPhotos, onPhotoSelect }: GalleryContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { groupRefs } = useGroupInView(contentRef, Object.keys(groupedPhotos));
  const { refreshPhotos, isRefreshing } = usePhotoSource();
  const { refreshIndicatorRef, pullProgress } = usePullToRefresh({
    onRefresh: refreshPhotos,
    isRefreshing
  });

  return (
    <main 
      ref={contentRef}
      className="flex-1 overflow-x-hidden relative"
    >
      {/* Pull-to-refresh indicator */}
      <div
        ref={refreshIndicatorRef}
        className="absolute left-0 right-0 -top-16 flex items-center justify-center h-16 pointer-events-none transition-transform duration-200"
        style={{ transform: 'translateY(0)' }}
      >
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <RefreshCw 
            className={`h-5 w-5 transition-transform duration-300 ${
              isRefreshing ? 'animate-spin' : ''
            }`}
            style={{
              transform: `rotate(${Math.min(pullProgress * 360, 360)}deg)`
            }}
          />
          <span className="text-sm">
            {isRefreshing ? '更新中...' : pullProgress >= 1 ? '指を離して更新' : '引っ張って更新'}
          </span>
        </div>
      </div>

      <div className="max-w-[2000px] mx-auto py-8">
        <div className="space-y-8">
          {Object.entries(groupedPhotos).map(([groupKey, group]) => (
            <section 
              key={groupKey} 
              className="space-y-4"
              ref={(el) => {
                if (el) {
                  groupRefs.current.set(groupKey, el);
                } else {
                  groupRefs.current.delete(groupKey);
                }
              }}
              data-group-name={groupKey}
            >
              <div className="px-4 sm:px-6 lg:px-8">
                <LocationGroupHeader 
                  groupName={group.location}
                  photoCount={group.photos.length}
                  date={group.date}
                />
              </div>
              <PhotoGrid 
                photos={group.photos} 
                onPhotoSelect={onPhotoSelect}
              />
            </section>
          ))}
        </div>
      </div>

      {/* Loading indicator */}
      <div
        className={`fixed bottom-6 right-6 transition-all duration-300 ${
          isRefreshing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="bg-gray-800/90 dark:bg-gray-900/90 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span className="text-sm">新しい写真を確認中...</span>
        </div>
      </div>
    </main>
  );
});

GalleryContent.displayName = 'GalleryContent';

export default GalleryContent;