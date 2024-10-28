import React from 'react';
import { Photo } from '../types/photo';
import { memo } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import ProgressiveImage from './ProgressiveImage';

interface PhotoCardProps {
  photo: Photo;
  priority?: boolean;
  onSelect: (photo: Photo) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = memo(({ photo, priority = false, onSelect }) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    rootMargin: '200px',
  });

  const shouldLoad = priority || (entry?.isIntersecting ?? false);

  const thumbnailSizes = {
    sm: '180w',
    md: '280w',
    lg: '380w'
  };

  const generateOptimizedUrl = (baseUrl: string, width: number, format: string) => {
    return `${baseUrl}?w=${width}&q=40&fm=${format}&fit=crop`;
  };

  return (
    <div 
      ref={ref}
      className="h-full group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
      onClick={() => onSelect(photo)}
    >
      <div className="h-full">
        {shouldLoad ? (
          <picture>
            <source
              type="image/avif"
              srcSet={`
                ${generateOptimizedUrl(photo.url, 180, 'avif')} ${thumbnailSizes.sm},
                ${generateOptimizedUrl(photo.url, 280, 'avif')} ${thumbnailSizes.md},
                ${generateOptimizedUrl(photo.url, 380, 'avif')} ${thumbnailSizes.lg}
              `}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
            <source
              type="image/webp"
              srcSet={`
                ${generateOptimizedUrl(photo.url, 180, 'webp')} ${thumbnailSizes.sm},
                ${generateOptimizedUrl(photo.url, 280, 'webp')} ${thumbnailSizes.md},
                ${generateOptimizedUrl(photo.url, 380, 'webp')} ${thumbnailSizes.lg}
              `}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
            <ProgressiveImage
              src={generateOptimizedUrl(photo.url, 180, 'jpg')}
              alt={photo.title}
              className="w-full h-full object-cover"
              loading={priority ? "eager" : "lazy"}
              fetchpriority={priority ? "high" : "auto"}
              srcSet={`
                ${generateOptimizedUrl(photo.url, 180, 'jpg')} ${thumbnailSizes.sm},
                ${generateOptimizedUrl(photo.url, 280, 'jpg')} ${thumbnailSizes.md},
                ${generateOptimizedUrl(photo.url, 380, 'jpg')} ${thumbnailSizes.lg}
              `}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </picture>
        ) : (
          <div className="w-full h-full bg-gray-100 animate-pulse" />
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <h3 className="text-white font-semibold truncate">{photo.title}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {photo.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/20 text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

PhotoCard.displayName = 'PhotoCard';

export default PhotoCard;