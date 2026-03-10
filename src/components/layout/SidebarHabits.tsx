'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';

// ============================================
// 7 Habits Data
// ============================================

interface Habit {
  id: number;
  title: string;
  imageSrc: string;
  href: string;
}

const HABITS: Habit[] = [
  {
    id: 1,
    title: 'Be Proactive',
    imageSrc: '/img/7habits/first.jpg',
    href: '/leadership/habits',
  },
  {
    id: 2,
    title: 'Begin with the End in Mind',
    imageSrc: '/img/7habits/second.jpg',
    href: '/leadership/habits',
  },
  {
    id: 3,
    title: 'Put First Things First',
    imageSrc: '/img/7habits/third.jpg',
    href: '/leadership/habits',
  },
  {
    id: 4,
    title: 'Think Win-Win',
    imageSrc: '/img/7habits/fourth.jpg',
    href: '/leadership/habits',
  },
  {
    id: 5,
    title: 'Seek First to Understand, Then to Be Understood',
    imageSrc: '/img/7habits/fifth.jpg',
    href: '/leadership/habits',
  },
  {
    id: 6,
    title: 'Synergize',
    imageSrc: '/img/7habits/sixth.jpg',
    href: '/leadership/habits',
  },
  {
    id: 7,
    title: 'Sharpen the Saw',
    imageSrc: '/img/7habits/seventh.jpg',
    href: '/leadership/habits',
  },
];

// ============================================
// Animation Variants
// ============================================

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

// ============================================
// Component
// ============================================

export default function SidebarHabits() {
  return (
    <div className="space-y-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {HABITS.map((habit) => (
          <motion.div
            key={habit.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href={habit.href} className="block">
              <div className="relative w-full overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow bg-slate-50/50 p-3">
                <Image
                  src={habit.imageSrc}
                  alt={habit.title}
                  width={300}
                  height={80}
                  className="w-full h-auto object-contain"
                  style={{ aspectRatio: '300/80' }}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

