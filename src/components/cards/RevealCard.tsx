'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import SafeImage from '@/components/ui/SafeImage';

// ============================================
// Types
// ============================================

interface RevealCardProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  href?: string;
  className?: string;
}

// ============================================
// Animation Variants
// ============================================

const overlayVariants: Variants = {
  rest: {
    x: '0%',
    opacity: 0.9,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    x: '-100%',
    opacity: 0.9,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const contentVariants: Variants = {
  rest: {
    y: '100%',
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  hover: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const imageVariants: Variants = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// ============================================
// RevealCard Component
// ============================================

export default function RevealCard({
  title,
  subtitle,
  imageSrc,
  href = '#',
  className,
}: RevealCardProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-lg shadow-md group',
        'aspect-video cursor-pointer',
        className
      )}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Layer 3: Image Background */}
      <motion.div
        className="absolute inset-0 bg-white/10 backdrop-blur-sm"
        variants={imageVariants}
      >
        <SafeImage
          src={imageSrc}
          alt={title}
          fill
          fit="contain"
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>

      {/* Dark overlay on image */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

      {/* Layer 1: Red (#CC0000) Overlay with Habit Title - Slides LEFT on hover */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: '#CC0000' }}
        variants={overlayVariants}
      >
        <div className="text-center px-4">
          <h3 className="text-white text-lg md:text-xl font-bold text-center">
            {title}
          </h3>
          {subtitle && (
            <p className="text-white/80 text-sm mt-2 text-center">
              {subtitle}
            </p>
          )}
        </div>
      </motion.div>

      {/* Layer 2: Text Info - Slides UP on hover */}
      <motion.div
        className="absolute inset-0 flex items-end"
        variants={contentVariants}
      >
        <div className="w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white text-lg md:text-xl font-bold">
            {title}
          </h3>
          {subtitle && (
            <p className="text-white/80 text-sm mt-1">
              {subtitle}
            </p>
          )}
          {href !== '#' && (
            <Link
              href={href}
              className="inline-block mt-3 text-sm font-medium text-[#CC0000] hover:text-white transition-colors"
            >
              Learn More →
            </Link>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

