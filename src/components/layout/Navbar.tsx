'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COLORS } from '@/lib/constants';
import SafeImage from '@/components/ui/SafeImage';

// ============================================
// Navigation Data
// ============================================

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  children?: NavItem[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About PinHwa',
    href: '/about',
    children: [
      { label: 'Meet PinHwa', href: '/about/badge' },
      { label: 'School History', href: '/about/history' },
      { label: 'School Scene', href: '/about/gallery' },
      { label: 'Three Institutions', href: '/about/director' },
      { label: 'Five-star Certificate', href: '/about/cert' },
    ],
  },
  {
    label: 'Administrative',
    href: '/administrative',
    children: [
      { label: 'Administrative Structure', href: '/administrative' },
      { label: "Principal's Office", href: '/administrative/principal' },
      { label: 'Academic Affairs', href: '/administrative/academic' },
      { label: 'Disciplinary', href: '/administrative/discipline' },
      { label: 'Counseling', href: '/administrative/counseling' },
      { label: 'Co-curricular', href: '/administrative/curricular' },
      { label: 'Sports', href: '/administrative/sports' },
      { label: 'General Affairs', href: '/administrative/general' },
      { label: 'Dormitory', href: '/administrative/dormitory' },
    ],
  },
  {
    label: 'Self-Leadership',
    href: '/leadership',
    children: [
      { label: 'Expansion Journey', href: '/leadership/expansion' },
      { label: 'Roll of Honor', href: '/leadership/honor' },
      { label: 'Video Library', href: '/leadership/video' },
      { label: '7 Habits', href: '/leadership/habits' },
    ],
  },
  {
    label: 'Multimedia',
    href: '/multimedia',
    children: [
      { label: 'Pin News', href: '/multimedia/news' },
    ],
  },
  { label: 'Contact', href: '/contact' },
  { label: 'News & Events', href: '/news' },
  { label: 'Enrollment', href: '/enrollment' },
];

// ============================================
// NavLink Component with Animated Underline
// ============================================

function NavLink({
  item,
  isActive,
  isHovered,
  hoverRef,
  activeRef,
}: {
  item: NavItem;
  isActive: boolean;
  isHovered: boolean;
  hoverRef: React.RefObject<HTMLAnchorElement | null>;
  activeRef: React.RefObject<HTMLAnchorElement | null>;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const linkRef = item.href === '/' ? activeRef : hoverRef;

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (hasChildren) setIsExpanded(true);
      }}
      onMouseLeave={() => {
        if (hasChildren) setIsExpanded(false);
      }}
    >
      <Link
        ref={linkRef}
        href={item.href}
        className={cn(
          'relative px-4 py-2 text-sm font-medium transition-colors duration-200',
          isActive ? 'text-white' : 'text-white/90 hover:text-white'
        )}
        target={item.isExternal ? '_blank' : undefined}
        rel={item.isExternal ? 'noopener noreferrer' : undefined}
      >
        <span className="relative z-10">{item.label}</span>
        
        {/* Animated Underline */}
        <motion.span
          className="absolute bottom-0 left-0 h-0.5 bg-[#CC0000]"
          initial={false}
          animate={{
            left: isActive ? 0 : '100%',
            width: isActive ? '100%' : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        />
        
        {hasChildren && (
          <ChevronDown
            className={cn(
              'inline-block ml-1 w-4 h-4 transition-transform',
              isExpanded && 'rotate-180'
            )}
          />
        )}
      </Link>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 min-w-[200px] py-2 rounded-md shadow-lg z-50"
            style={{ backgroundColor: COLORS.primary }}
          >
            {item.children!.map((child, index) => (
              <Link
                key={index}
                href={child.href}
                className="block px-4 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                target={child.isExternal ? '_blank' : undefined}
                rel={child.isExternal ? 'noopener noreferrer' : undefined}
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// Mobile Menu Component
// ============================================

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#003366] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <span className="text-lg font-bold text-white">导航</span>
              <button
                onClick={onClose}
                className="p-2 text-white hover:bg-white/10 rounded-md"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="p-4">
              {NAV_ITEMS.map((item, index) => (
                <MobileNavItem key={index} item={item} onItemClick={onClose} />
              ))}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileNavItem({
  item,
  depth = 0,
  onItemClick,
}: {
  item: NavItem;
  depth?: number;
  onItemClick: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    onItemClick();
  };

  return (
    <div className="mb-1">
      {item.isExternal ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'block px-4 py-3 text-white text-sm font-medium rounded-md',
            'hover:bg-white/10 transition-colors',
            depth > 0 && 'ml-4'
          )}
          onClick={handleClick}
        >
          {item.label}
        </a>
      ) : hasChildren ? (
        <>
          <button
            onClick={handleClick}
            className={cn(
              'flex items-center justify-between w-full px-4 py-3 text-white text-sm font-medium rounded-md',
              'hover:bg-white/10 transition-colors',
              depth > 0 && 'ml-4'
            )}
          >
            <span>{item.label}</span>
            <ChevronDown
              className={cn(
                'w-4 h-4 transition-transform',
                isExpanded && 'rotate-180'
              )}
            />
          </button>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              {item.children!.map((child, index) => (
                <MobileNavItem
                  key={index}
                  item={child}
                  depth={depth + 1}
                  onItemClick={onItemClick}
                />
              ))}
            </motion.div>
          )}
        </>
      ) : (
        <Link
          href={item.href}
          className={cn(
            'block px-4 py-3 text-white text-sm font-medium rounded-md',
            'hover:bg-white/10 transition-colors',
            depth > 0 && 'ml-4'
          )}
          onClick={handleClick}
        >
          {item.label}
        </Link>
      )}
    </div>
  );
}

// ============================================
// Main Navbar Component
// ============================================

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const activeRef = useRef<HTMLAnchorElement>(null);
  const hoverRef = useRef<HTMLAnchorElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine which link should show the underline
  const isActive = (href: string) => activeLink === href;
  const isHovered = (href: string) => hoveredLink === href;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-[#003366] shadow-lg'
            : 'bg-[#003366]'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <SafeImage
                src="/img/logo.png"
                alt="Pin Hwa High School Logo"
                width={180}
                height={60}
                className="h-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.label}
                  item={item}
                  isActive={isActive(item.href)}
                  isHovered={isHovered(item.href)}
                  hoverRef={hoverRef}
                  activeRef={activeRef}
                />
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-md"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
}

