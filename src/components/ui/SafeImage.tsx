'use client';

import React, { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

const FALLBACK_IMAGE = 'https://placehold.co/600x400?text=Pin+Hwa+Asset';

type SafeImageProps = {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  aspect?: 'square' | 'video' | 'wide' | 'tall';
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
} & Omit<ImageProps, 'src' | 'alt' | 'fill' | 'width' | 'height'>;

/**
 * SafeImage - A wrapper for Next.js Image with fallback and responsive options
 * Prevents "received null" crashes when local path is missing
 * Supports aspect ratios and object-fit options
 */
export default function SafeImage({
  src,
  alt,
  fallbackSrc = FALLBACK_IMAGE,
  className,
  fill = true,
  width,
  height,
  priority,
  sizes,
  aspect,
  fit = 'cover',
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Determine aspect ratio class
  const aspectClass = aspect 
    ? {
        square: 'aspect-square',
        video: 'aspect-video',
        wide: 'aspect-[21/9]',
        tall: 'aspect-[3/4]',
      }[aspect] || ''
    : '';

  // Determine object-fit class
  const fitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  }[fit] || 'object-cover';

  // Don't render if src is empty
  if (!src && !fallbackSrc) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gray-200',
        aspectClass,
        !aspectClass && (fill ? 'w-full h-full' : ''),
        className
      )}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse" />
      )}
      <Image
        src={imgSrc || fallbackSrc}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={cn(
          fitClass,
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        sizes={sizes}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
}

