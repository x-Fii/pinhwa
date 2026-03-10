'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, History, Award, Newspaper, Building2, CreditCard, ChevronRight } from 'lucide-react';
import SafeImage from '@/components/ui/SafeImage';

// ============================================
// Types
// ============================================

interface NavLink {
  label: string;
  sublabel: string;
  href: string;
  icon: React.ReactNode;
}

interface HeroPanel {
  id: 'legacy' | 'campus';
  title: string;
  titleZh: string;
  subtitle: string;
  subtitleZh: string;
  imageSrc: string;
  links: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  accentColor: string;
  accentBg: string;
}

// ============================================
// Panel Data
// ============================================

const LEFT_PANEL: HeroPanel = {
  id: 'legacy',
  title: 'THE PIN HWA LEGACY',
  titleZh: '滨华传承',
  subtitle: 'Prospective Students',
  subtitleZh: '探索滨华',
  imageSrc: '/images/slides/hero-legacy.jpg',
  links: [
    {
      label: '7 Habits',
      sublabel: '自我领导力',
      href: '/leadership/habits',
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      label: 'School History',
      sublabel: '校史',
      href: '/about/history',
      icon: <History className="w-5 h-5" />,
    },
    {
      label: 'Five-Star Cert',
      sublabel: '五星品质标准',
      href: '/about/cert',
      icon: <Award className="w-5 h-5" />,
    },
  ],
  ctaLabel: 'Enroll for 2026',
  ctaHref: '/enrollment',
  accentColor: 'text-amber-400',
  accentBg: 'bg-amber-500',
};

const RIGHT_PANEL: HeroPanel = {
  id: 'campus',
  title: 'CAMPUS ECOSYSTEM',
  titleZh: '校园生态',
  subtitle: 'Current Students & Parents',
  subtitleZh: '在校学生与家长',
  imageSrc: '/images/slides/hero-ecosystem.jpg',
  links: [
    {
      label: 'Pin News',
      sublabel: '滨讯',
      href: '/news',
      icon: <Newspaper className="w-5 h-5" />,
    },
    {
      label: 'Administrative Org',
      sublabel: '行政组织',
      href: '/administrative',
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      label: 'FPX Payment',
      sublabel: '缴费',
      href: '/enrollment',
      icon: <CreditCard className="w-5 h-5" />,
    },
  ],
  ctaLabel: 'Student & Parent Portal',
  ctaHref: '/enrollment',
  accentColor: 'text-teal-400',
  accentBg: 'bg-teal-500',
};

// ============================================
// Single Panel Component
// ============================================

function HeroPanelComponent({ 
  panel, 
  isLeft = false 
}: { 
  panel: HeroPanel; 
  isLeft?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`
        relative flex-1 h-full
        flex flex-col justify-center overflow-hidden
        cursor-pointer
      `}
      layout
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={isHovered ? { opacity: 1, flex: 1.5 } : { opacity: 1, flex: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm">
        <SafeImage
          src={panel.imageSrc}
          alt={panel.title}
          fill
          priority={isLeft}
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${isLeft ? 'from-slate-900/90 via-slate-900/50 to-transparent' : 'from-transparent via-slate-900/50 to-slate-900/90'}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content - pointer-events-none to prevent hover interruption */}
      <div className={`
        relative z-10 h-full flex flex-col justify-center
        px-8 py-12
        ${isLeft ? 'items-start text-left' : 'items-end text-right'}
        pointer-events-none
      `}>
        {/* Main Title */}
        <motion.div
          className="mb-2 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide ${panel.accentColor}`}>
            {panel.title}
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mt-1 font-medium">
            {panel.titleZh}
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-white/70 text-lg">
            {panel.subtitle}
          </p>
          <p className="text-white/50 text-md">
            {panel.subtitleZh}
          </p>
        </motion.div>

        {/* Glassmorphism Navigation Links */}
        <motion.nav
          className={`
            flex flex-col gap-3 mb-10 
            ${isLeft ? 'items-start' : 'items-end'}
            p-4 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20
            group-hover:bg-white/15 group-hover:border-white/30
            transition-all duration-500
          `}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {panel.links.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className={`
                group/link flex items-center gap-3
                text-white/90 hover:text-white
                transition-all duration-300
                hover:translate-x-2 ${!isLeft && 'hover:-translate-x-2'}
                pointer-events-auto
              `}
              style={{ 
                transitionDelay: `${index * 50 + 100}ms` 
              }}
            >
              <span className={`
                p-2 rounded-lg bg-white/10 backdrop-blur-sm
                group-hover/link:bg-white/20 group-hover/link:scale-110
                transition-all duration-300
                ${panel.accentColor}
              `}>
                {link.icon}
              </span>
              <div className="flex flex-col">
                <span className="font-medium">{link.label}</span>
                <span className="text-sm text-white/60">{link.sublabel}</span>
              </div>
              <ChevronRight className={`
                w-4 h-4 ml-1
                group-hover/link:translate-x-1 transition-transform duration-300
                ${!isLeft && 'rotate-180'}
              `} />
            </Link>
          ))}
        </motion.nav>

        {/* CTA Button */}
        <motion.div
          className={`
            flex ${isLeft ? 'justify-start' : 'justify-end'}
          `}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link
            href={panel.ctaHref}
            className={`
              group/btn flex items-center gap-3
              px-8 py-4 rounded-lg font-semibold text-lg
              transition-all duration-300
              hover:scale-105 hover:shadow-xl
              ${panel.accentBg} hover:brightness-110 text-slate-900
              pointer-events-auto
            `}
          >
            {panel.ctaLabel}
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>

      {/* Decorative Corner Accent */}
      <div className={`
        absolute top-0 w-24 h-24 
        border-t-4 border-l-4 rounded-tl-3xl
        ${isLeft ? 'border-l-amber-400' : 'border-r-teal-400 border-l-0'}
        border-t-white/30
        opacity-0 group-hover:opacity-100
        transition-all duration-500
        ${isLeft ? 'left-0' : 'right-0'}
      `} />
    </motion.div>
  );
}

// ============================================
// SplitHero Main Component
// ============================================

export default function SplitHero() {
  return (
    <div className="flex w-full h-[100dvh]">
      {/* Left Panel - THE PIN HWA LEGACY */}
      <HeroPanelComponent panel={LEFT_PANEL} isLeft />

      {/* Right Panel - CAMPUS ECOSYSTEM */}
      <HeroPanelComponent panel={RIGHT_PANEL} />
    </div>
  );
}

