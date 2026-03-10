'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription 
} from '@/components/ui/sheet';
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Building2, 
  Trophy, 
  Video, 
  Contact, 
  Newspaper,
  GraduationCap,
  ChevronDown,
  Library,
  ExternalLink
} from 'lucide-react';
import { NAVIGATION, isExternalLink, COLORS } from '@/lib/constants';

// ============================================
// Animation Variants
// ============================================

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
// Icon Mapping
// ============================================

const getIconForLabel = (label: string) => {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes('home')) return Home;
  if (lowerLabel.includes('about') || lowerLabel.includes('badge') || lowerLabel.includes('history') || lowerLabel.includes('gallery')) return BookOpen;
  if (lowerLabel.includes('administrative') || lowerLabel.includes('principal') || lowerLabel.includes('academic') || lowerLabel.includes('discipline') || lowerLabel.includes('counseling') || lowerLabel.includes('curricular') || lowerLabel.includes('sports') || lowerLabel.includes('general') || lowerLabel.includes('dormitory')) return Building2;
  if (lowerLabel.includes('leadership') || lowerLabel.includes('honor') || lowerLabel.includes('habits') || lowerLabel.includes('expansion')) return Trophy;
  if (lowerLabel.includes('video') || lowerLabel.includes('multimedia')) return Video;
  if (lowerLabel.includes('contact')) return Contact;
  if (lowerLabel.includes('news') || lowerLabel.includes('event') || lowerLabel.includes('campus') || lowerLabel.includes('report')) return Newspaper;
  if (lowerLabel.includes('enrollment') || lowerLabel.includes('student')) return GraduationCap;
  if (lowerLabel.includes('library') || lowerLabel.includes('ebook') || lowerLabel.includes('book')) return Library;
  return ChevronDown;
};

// ============================================
// Types
// ============================================

interface SidebarProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
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
  
  const IconComponent = getIconForLabel(item.label);

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
        flex items-center gap-3 w-full px-4 py-3 
        text-white text-sm font-medium rounded-md
        cursor-pointer transition-colors
        ${depth > 0 ? 'ml-4' : ''}
      `}
      style={{
        backgroundColor: COLORS.primary,
      }}
      onClick={handleClick}
    >
      <IconComponent className="w-5 h-5 flex-shrink-0" />
      <span className="flex-1">{item.label}</span>
      {hasChildren && (
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-2"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      )}
      {isExternal && !hasChildren && (
        <ExternalLink className="w-4 h-4 ml-2" />
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
    </div>
  );
}

/**
 * Sidebar Component with shadcn/ui Sheet
 */
export default function Sidebar({ isOpen, onOpenChange }: SidebarProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  // Handle controlled/uncontrolled modes
  const open = isOpen !== undefined ? isOpen : isSheetOpen;
  const onOpen = onOpenChange || setIsSheetOpen;
  
  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setIsSheetOpen(newOpen);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger>
        <button
          className="p-2 rounded-md hover:bg-primary/10 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6 text-[#003366]" />
        </button>
      </SheetTrigger>
      
      <SheetContent 
        side="left" 
        className="w-[300px] sm:w-[350px] p-0"
        style={{ backgroundColor: COLORS.primary }}
      >
        <SheetHeader className="p-4 border-b border-white/20">
          <SheetTitle className="text-xl font-bold text-white">
            导航 | Navigation
          </SheetTitle>
          <SheetDescription className="text-white/70">
            Select a page to navigate
          </SheetDescription>
        </SheetHeader>
        
        {/* Navigation Links */}
        <nav className="p-4 overflow-y-auto h-[calc(100vh-120px)]">
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
      </SheetContent>
    </Sheet>
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

