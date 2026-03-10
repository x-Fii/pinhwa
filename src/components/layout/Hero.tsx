'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';

// ============================================
// Hero Component with Parallax Effect
// ============================================

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress for this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[85vh] min-h-[600px] overflow-hidden"
    >
      {/* Parallax Background Layer */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {/* Background Image - using SafeImage to prevent crashes */}
        <SafeImage
          src="/img/banner-school.jpg"
          alt="Pin Hwa High School Campus"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </motion.div>

      {/* Content Layer */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4">
            滨华中学
          </h1>
          <p className="text-xl md:text-2xl text-white/90 drop-shadow-md mb-2">
            Pin Hwa High School Klang
          </p>
          <p className="text-lg md:text-xl text-white/80 drop-shadow">
            2026 招生中 | Enrollment Open
          </p>
        </motion.div>

        {/* Glassmorphism Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8"
        >
          <div className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg">
            <p className="text-white/90 text-lg md:text-xl font-medium">
              "全人教育，卓越领导"
            </p>
            <p className="text-white/70 text-md mt-2">
              Holistic Education, Leadership Excellence
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <a
            href="/enrollment"
            className="px-8 py-3 bg-[#CC0000] text-white font-semibold rounded-lg hover:bg-[#aa0000] transition-colors shadow-lg"
          >
            立即报名 Apply Now
          </a>
          <a
            href="/about"
            className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-colors border border-white/30"
          >
            了解更多 Learn More
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <button
          onClick={scrollToContent}
          className="flex flex-col items-center text-white/80 hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-sm mb-2">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </button>
      </motion.div>
    </div>
  );
}

