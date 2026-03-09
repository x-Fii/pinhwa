/**
 * Pin Hwa High School - Route Constants
 * Maps legacy PHP/HTML paths to modern Next.js routes
 * Flags external links to open in new tabs
 */

import { LinkProps } from 'next/link';

// ============================================
// Route Type Definitions
// ============================================

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  children?: NavItem[];
}

export interface ExternalLink {
  label: string;
  url: string;
  icon?: string;
}

// ============================================
// Legacy to Next.js Route Mapping
// ============================================

/**
 * Maps legacy PHP/HTML paths to modern Next.js routes
 * Based on README.md Page Structure
 */
export const ROUTE_MAP: Record<string, string> = {
  // Home
  '/index.php': '/',
  '/index.html': '/',
  
  // About PinHwa (knowingpinhwa)
  '/knowingpinhwa/': '/about',
  '/knowingpinhwa/badge.html': '/about/badge',
  '/knowingpinhwa/history.html': '/about/history',
  '/knowingpinhwa/photo.html': '/about/gallery',
  '/knowingpinhwa/director.html': '/about/director',
  '/knowingpinhwa/cert.html': '/about/cert',
  
  // Administrative Organization
  '/administrative/': '/administrative',
  '/administrative/administrative.html': '/administrative',
  '/administrative/principalprogram.html': '/administrative/principal',
  '/administrative/deanchart.html': '/administrative/academic',
  '/administrative/disciplinaryjobtask.html': '/administrative/discipline',
  '/administrative/counselingjobtask.html': '/administrative/counseling',
  '/administrative/curricularjobtask.html': '/administrative/curricular',
  '/administrative/sportsjobtask.html': '/administrative/sports',
  '/administrative/generaljobtask.html': '/administrative/general',
  '/administrative/dormitoryintro.html': '/administrative/dormitory',
  
  // Self-leadership
  '/leadership/': '/leadership',
  '/leadership/expansion.html': '/leadership/expansion',
  '/leadership/hallofcurricular-out-2026-sport.php': '/leadership/honor',
  '/leadership/video.html': '/leadership/video',
  '/leadership/7habits.html': '/leadership/habits',
  
  // Multimedia
  '/multimedia/': '/multimedia',
  '/multimedia/pinnews.html': '/multimedia/news',
  '/multimedia/ebook.html': '/multimedia/ebook',
  
  // Contact
  '/contact.html': '/contact',
  
  // Event Reports
  '/latest-news.php': '/news',
  '/schoolvideo.html': '/events',
  '/activities.php': '/news',
  '/thanks.php': '/thanks',
  '/sop.php': '/sop',
  
  // Enrollment
  '/upload/': '/enrollment',
  '/upload/2026PinHwaStudentEnrollment3.pdf': '/enrollment',
};

// ============================================
// External Links (Open in New Tab)
// ============================================

export const EXTERNAL_LINKS: Record<string, ExternalLink> = {
  LIBRARY: {
    label: 'Resource Library',
    url: 'https://sites.google.com/view/pinhwalibrary',
    icon: 'library',
  },
  EBOOK: {
    label: 'E-book',
    url: 'https://smpinhwa.ebook.hyread.com.tw',
    icon: 'book',
  },
  FPX: {
    label: 'FPX Payment',
    url: 'https://app-smpinhwa.skribblelearn.com/#/login',
    icon: 'payment',
  },
  ENROLLMENT_EBOOK: {
    label: '2026 Enrollment E-book',
    url: 'https://smpinhwa.edu.my/upload/ebook/newenrollment/2026/2026studentenrollment.html',
    icon: 'book',
  },
  RECRUITMENT: {
    label: 'Recruitment',
    url: 'https://smpinhwa.edu.my/upload/announcement/20260227162055.pdf',
    icon: 'career',
  },
};

// ============================================
// Navigation Structure
// ============================================

export const NAVIGATION: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
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
      { 
        label: 'Resource Library', 
        href: EXTERNAL_LINKS.LIBRARY.url, 
        isExternal: true 
      },
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
      { 
        label: 'E-book', 
        href: EXTERNAL_LINKS.EBOOK.url, 
        isExternal: true 
      },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
  },
  {
    label: 'News & Events',
    href: '/news',
    children: [
      { label: 'School News', href: '/news' },
      { label: 'Campus Reports', href: '/events' },
      { label: 'Thanks for Sponsorship', href: '/thanks' },
      { label: 'Campus SOP', href: '/sop' },
    ],
  },
  {
    label: 'Enrollment',
    href: '/enrollment',
    children: [
      { 
        label: 'E-book', 
        href: EXTERNAL_LINKS.ENROLLMENT_EBOOK.url, 
        isExternal: true 
      },
    ],
  },
  {
    label: 'FPX Payment',
    href: EXTERNAL_LINKS.FPX.url,
    isExternal: true,
  },
  {
    label: 'Recruitment',
    href: EXTERNAL_LINKS.RECRUITMENT.url,
    isExternal: true,
  },
];

// ============================================
// Brand Colors
// ============================================

export const COLORS = {
  primary: '#003366',
  primaryDark: '#001a33',
  primaryLight: '#004d99',
  accent: '#c41e3a', // Red accent
  white: '#ffffff',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

// ============================================
// Helper Functions
// ============================================

/**
 * Check if a link is external
 */
export function isExternalLink(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}

/**
 * Get the modern Next.js route from legacy path
 */
export function getModernRoute(legacyPath: string): string {
  return ROUTE_MAP[legacyPath] || legacyPath;
}

/**
 * Generate Link props based on href
 */
export function getLinkProps(href: string): Partial<LinkProps> & { href: string; target?: string; rel?: string } {
  const isExternal = isExternalLink(href);
  
  if (isExternal) {
    return {
      href,
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }
  
  return {
    href,
  };
}

