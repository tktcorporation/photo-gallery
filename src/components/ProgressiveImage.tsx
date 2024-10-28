import React, { useState, useEffect } from 'react';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  srcSet?: string;
  loading?: 'lazy' | 'eager';
  fetchpriority?: 'high' | 'low' | 'auto';
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className = '',
  sizes,
  srcSet,
  loading = 'lazy',
  fetchpriority = 'auto'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  useEffect(() => {
    // Generate tiny thumbnail URL (10px wide, very low quality)
    const url = new URL(src);
    url.searchParams.set('w', '10');
    url.searchParams.set('q', '10');
    setThumbnailUrl(url.toString());
  }, [src]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Tiny blurred thumbnail */}
      <img
        src={thumbnailUrl}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        } blur-xl scale-110`}
      />
      
      {/* Main image */}
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        srcSet={srcSet}
        loading={loading}
        fetchpriority={fetchpriority}
        onLoad={() => setIsLoaded(true)}
        className={`${className} relative w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default ProgressiveImage;