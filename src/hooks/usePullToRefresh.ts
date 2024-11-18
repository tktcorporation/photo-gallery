import { useEffect, useRef, useState } from 'react';

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void>;
  isRefreshing: boolean;
  threshold?: number;
}

export function usePullToRefresh({
  onRefresh,
  isRefreshing,
  threshold = 100
}: UsePullToRefreshOptions) {
  const pullStartY = useRef(0);
  const refreshIndicatorRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const [pullProgress, setPullProgress] = useState(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        pullStartY.current = e.touches[0].clientY;
        isDraggingRef.current = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || isRefreshing) return;

      const touchY = e.touches[0].clientY;
      const pullDistance = touchY - pullStartY.current;

      if (pullDistance > 0) {
        e.preventDefault();
        const indicator = refreshIndicatorRef.current;
        if (indicator) {
          const resistance = 0.4;
          const translation = Math.min(pullDistance * resistance, threshold);
          const progress = Math.min(translation / threshold, 1);
          
          indicator.style.transform = `translateY(${translation}px)`;
          setPullProgress(progress);
        }
      }
    };

    const handleTouchEnd = async () => {
      if (!isDraggingRef.current || isRefreshing) return;

      const indicator = refreshIndicatorRef.current;
      if (indicator) {
        const currentTranslation = parseFloat(
          indicator.style.transform.replace('translateY(', '').replace('px)', '') || '0'
        );

        if (currentTranslation >= threshold * 0.6) {
          await onRefresh();
        }

        // Reset the indicator and progress
        indicator.style.transform = 'translateY(0)';
        setPullProgress(0);
      }
      isDraggingRef.current = false;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onRefresh, isRefreshing, threshold]);

  return { refreshIndicatorRef, pullProgress };
}