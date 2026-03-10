'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone, FileText, BookOpen, ExternalLink } from 'lucide-react';

// ============================================
// Announcement Data
// ============================================

interface AnnouncementItem {
  id: number;
  title: string;
  href: string;
  isExternal?: boolean;
  icon?: 'file' | 'link' | 'video';
}

const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 1,
    title: '2026年教职员征聘',
    href: '/upload/announcement/20260227162055.pdf',
    icon: 'file',
  },
  {
    id: 2,
    title: '滨华云系统使用手册',
    href: 'https://sites.google.com/smpinhwa.edu.my/app',
    isExternal: true,
    icon: 'link',
  },
  {
    id: 3,
    title: '学生服装仪容标准',
    href: '/administrative/dresscode.html',
    icon: 'file',
  },
  {
    id: 4,
    title: '滨华中学简介',
    href: '/upload/announcement/0717.mp4',
    icon: 'video',
  },
  {
    id: 5,
    title: '雨天放学路线影片',
    href: '/upload/announcement/20200730044241.mp4',
    icon: 'video',
  },
  {
    id: 6,
    title: '图书馆入馆条规及申请',
    href: '/pdf/libraryrulenapply.pdf',
    icon: 'file',
  },
  {
    id: 7,
    title: '家长衣着通告',
    href: '/announce/announce.jpg',
    icon: 'file',
  },
];

// ============================================
// Icon Component
// ============================================

const getIcon = (iconType?: string) => {
  switch (iconType) {
    case 'link':
      return <ExternalLink className="w-4 h-4" />;
    case 'video':
      return <BookOpen className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

// ============================================
// Animation Variants
// ============================================

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
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

export default function AnnouncementCard() {
  return (
    <Card className="w-full shadow-md border-t-4 border-t-[#003366]">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-[#003366] flex items-center gap-2">
          <Megaphone className="w-5 h-5" />
          通告 Announcement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {ANNOUNCEMENTS.map((item) => (
            <motion.li
              key={item.id}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="flex items-start gap-3"
            >
              <span className="mt-1 text-[#CC0000]">
                {getIcon(item.icon)}
              </span>
              {item.isExternal ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 hover:text-[#003366] hover:underline leading-tight"
                >
                  {item.title}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm text-gray-700 hover:text-[#003366] hover:underline leading-tight"
                >
                  {item.title}
                </Link>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </CardContent>
    </Card>
  );
}

