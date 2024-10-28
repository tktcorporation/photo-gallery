import React, { useRef, useCallback } from 'react';
import { Photo } from '../types/photo';
import { useVirtualGrid } from '../hooks/useVirtualGrid';
import VirtualGridRow from './VirtualGridRow';

interface PhotoGridProps {
  photos: Photo[];
  onPhotoSelect: (photo: Photo) => void;
}

const PhotoGrid: React.FC<PhotoGridProps> = React.memo(({ photos, onPhotoSelect }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { virtualizer, getItemsForRow, totalSize, virtualRows } = useVirtualGrid({
    items: photos,
    parentRef,
    overscan: 1,
    rowHeight: 280,
  });

  const renderRow = useCallback((virtualRow: any) => (
    <VirtualGridRow
      key={virtualRow.index}
      items={getItemsForRow(virtualRow.index)}
      start={virtualRow.start}
      height={virtualRow.size}
      isPriority={virtualRow.index < 1}
      onPhotoSelect={onPhotoSelect}
    />
  ), [getItemsForRow, onPhotoSelect]);

  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-12rem)] overflow-auto"
      style={{ 
        contain: 'strict',
        willChange: 'transform',
      }}
    >
      <div
        style={{
          height: `${totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualRows.map(renderRow)}
      </div>
    </div>
  );
});

PhotoGrid.displayName = 'PhotoGrid';

export default PhotoGrid;