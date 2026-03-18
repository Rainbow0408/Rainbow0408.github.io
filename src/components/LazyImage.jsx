import { useState, useRef, useEffect } from 'react';
import { cn } from '../utils';

/**
 * 通用懒加载图片组件
 * - IntersectionObserver 进入视口才加载
 * - 加载前显示渐变骨架屏 shimmer 动画
 * - 加载完毕渐显过渡
 */
export function LazyImage({ src, alt, className, style, onClick, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      className={cn('relative overflow-hidden', className)}
      style={style}
      onClick={onClick}
    >
      {/* Skeleton shimmer */}
      {!isLoaded && (
        <div className="absolute inset-0 skeleton-shimmer rounded-inherit" />
      )}

      {/* Actual image (only set src when in view) */}
      {isInView && (
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{ imageRendering: 'high-quality' }}
          {...props}
        />
      )}
    </div>
  );
}
