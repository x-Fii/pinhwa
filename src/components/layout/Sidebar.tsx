'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION, isExternalLink, COLORS } from '@/lib/constants';

// ============================================
// Animation Variants
// ============================================

const sidebarVariants = {
  hidden: {
    x: -300,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
  exit: {
    x: -300,
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
} as const;

const linkContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const linkItemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    x: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
  hover: {
    backgroundColor: COLORS.primaryDark,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
} as const;

// ============================================
// Types
// ============================================

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// ============================================
// Components
// ============================================

/**
 * Navigation Link Item Component
 */
function NavLinkItem({ 
  item, 
  depth = 0,
  onItemClick
}: { 
  item: typeof NAVIGATION[0]; 
  depth?: number;
  onItemClick?: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isExternal = item.isExternal || isExternalLink(item.href);

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    if (onItemClick) {
      onItemClick();
    }
  };

  const linkContent = (
    <motion.div
      variants={linkItemVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`
        flex items-center justify-between w-full px-4 py-3 
        text-white text-sm font-medium rounded-md
        cursor-pointer transition-colors
        ${depth > 0 ? 'ml-4' : ''}
      `}
      style={{
        backgroundColor: COLORS.primary,
      }}
      onClick={handleClick}
    >
      <span>{item.label}</span>
      {hasChildren && (
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-2"
        >
          ▼
        </motion.span>
      )}
    </motion.div>
  );

  return (
    <div className="mb-1">
      {isExternal ? (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {linkContent}
        </a>
      ) : hasChildren ? (
        <button onClick={handleClick} className="w-full text-left">
          {linkContent}
        </button>
      ) : (
        <Link href={item.href} onClick={handleClick}>
          {linkContent}
        </Link>
      )}
      
      {/* Sub-menu */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-1"
          >
            {item.children!.map((child, index) => (
              <NavLinkItem key={index} item={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Sidebar Component
 */
export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          
          {/* Sidebar Panel */}
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 h-full w-72 z-50 shadow-xl"
            style={{ backgroundColor: COLORS.primary }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <h2 className="text-xl font-bold text-white">Navigation</h2>
              <button
                onClick={onClose}
                className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
                aria-label="Close sidebar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            
            {/* Navigation Links */}
            <nav className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
              <motion.div
                variants={linkContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {NAVIGATION.map((item, index) => (
                  <NavLinkItem key={index} item={item} />
                ))}
              </motion.div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// Export additional hook for sidebar control
// ============================================

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prev => !prev);
  
  return { isOpen, open, close, toggle };
}

