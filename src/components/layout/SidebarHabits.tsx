'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';

// ============================================
// 7 Habits Data
// ============================================

interface Habit {
  id: number;
  title: string;
  subtitle: string;
  imageSrc: string;
  href: string;
}

const HABITS: Habit[] = [
  {
    id: 1,
    title: 'Be Proactive',
    subtitle: '主动积极',
    imageSrc: '/img/7habits/first.jpg',
    href: '/leadership/habits',
  },
  {
    id: 2,
    title: 'Begin with the End in Mind',
    subtitle: '以终为始',
    imageSrc: '/img/7habits/second.jpg',
    href: '/leadership/habits',
  },
  {
    id: 3,
    title: 'Put First Things First',
    subtitle: '要事第一',
    imageSrc: '/img/7habits/third.jpg',
    href: '/leadership/habits',
  },
  {
    id: 4,
    title: 'Think Win-Win',
    subtitle: '双赢思维',
    imageSrc: '/img/7habits/fourth.jpg',
    href: '/leadership/habits',
  },
  {
    id: 5,
    title: 'Seek First to Understand',
    subtitle: '知彼解己',
    imageSrc: '/img/7habits/fifth.jpg',
    href: '/leadership/habits',
  },
  {
    id: 6,
    title: 'Synergize',
    subtitle: '统合综效',
    imageSrc: '/img/7habits/sixth.jpg',
    href: '/leadership/habits',
  },
  {
    id: 7,
    title: 'Sharpen the Saw',
    subtitle: '不断更新',
    imageSrc: '/img/7habits/seventh.jpg',
    href: '/leadership/habits',
  },
];

// ============================================
// Animation Variants (matching RevealCard)
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
// Component
// ============================================

export default function SidebarHabits() {
  return (
    <div className="w-full">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-[#003366] text-white">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-[#003366]">
            七个习惯 | 7 Habits
          </h3>
        </div>
        <p className="text-sm text-gray-500 pl-12">
          The 7 Habits of Highly Effective People
        </p>
      </motion.div>

      {/* Habits Cards - Vertical Layout for Sidebar with Reveal Effect */}
      <div className="space-y-3">
        {HABITS.map((habit) => (
          <motion.div
            key={habit.id}
            className="relative overflow-hidden rounded-lg shadow-md group aspect-video cursor-pointer"
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
                src={habit.imageSrc}
                alt={habit.title}
                fill
                fit="contain"
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 300px"
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
              <div className="text-center px-2">
                <h3 className="text-white text-sm md:text-base font-bold text-center line-clamp-1">
                  {habit.title}
                </h3>
                <p className="text-white/80 text-xs mt-1 text-center">
                  {habit.subtitle}
                </p>
              </div>
            </motion.div>

            {/* Layer 2: Text Info - Slides UP on hover */}
            <motion.div
              className="absolute inset-0 flex items-end"
              variants={contentVariants}
            >
              <div className="w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-sm md:text-base font-bold">
                  {habit.title}
                </h3>
                <p className="text-white/80 text-xs mt-1">
                  {habit.subtitle}
                </p>
                <Link
                  href={habit.href}
                  className="inline-block mt-2 text-xs font-medium text-[#CC0000] group-hover:text-white transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}