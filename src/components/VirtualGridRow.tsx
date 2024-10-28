import React from 'react';
import { Photo } from '../types/photo';
import PhotoCard from './PhotoCard';

interface VirtualGridRowProps {
  items: (Photo | undefined)[];
  start: number;
  height: number;
  isPriority?: boolean;
  onPhotoSelect: (photo: Photo) => void;
}

const VirtualGridRow: React.FC<VirtualGridRowProps> = React.memo(({ 
  items, 
  start, 
  height,
  isPriority = false,
  onPhotoSelect
}) => {
  return (
    <div
      className="absolute left-0 right-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      style={{
        transform: `translateY(${start}px)`,
        height: `${height}px`,
        willChange: 'transform',
      }}
    >
      {items.map((item, index) => (
        item ? (
          <div key={item.id} className="h-[280px]">
            <PhotoCard 
              photo={item} 
              priority={isPriority}
              onSelect={onPhotoSelect}
            />
          </div>
        ) : null
      ))}
    </div>
  );
});

VirtualGridRow.displayName = 'VirtualGridRow';

export default VirtualGridRow;