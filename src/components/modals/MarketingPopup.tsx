'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

// ============================================
// Session Storage Key
// ============================================

const MARKETING_POPUP_KEY = 'pinhwa_marketing_popup_shown';

// ============================================
// Types
// ============================================

interface MarketingPopupProps {
  imageSrc?: string;
  imageAlt?: string;
  width?: number;
  height?: number;
  linkUrl?: string;
  linkText?: string;
}

// ============================================
// Default Marketing Image
// ============================================

const DEFAULT_IMAGE = '/images/marketing-popup.png';

// ============================================
// Component
// ============================================

export default function MarketingPopup({
  imageSrc = DEFAULT_IMAGE,
  imageAlt = 'Pin Hwa High School - Special Announcement',
  width = 400,
  height = 600,
  linkUrl,
  linkText = 'Learn More',
}: MarketingPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup has been shown in this session
    const hasShownPopup = sessionStorage.getItem(MARKETING_POPUP_KEY);

    if (!hasShownPopup) {
      // Small delay to ensure page is loaded
      const timer = setTimeout(() => {
        setIsOpen(true);
        // Mark as shown for this session
        sessionStorage.setItem(MARKETING_POPUP_KEY, 'true');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    if (linkUrl) {
      window.open(linkUrl, '_blank');
    }
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        className="p-0 overflow-hidden border-0"
        style={{ 
          maxWidth: `${width}px`,
          width: '90vw'
        }}
        showCloseButton={true}
      >
        {/* Close Button - Custom positioned */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 p-2 bg-white/80 hover:bg-white rounded-full transition-colors shadow-md"
          aria-label="Close popup"
        >
          <X className="h-5 w-5 text-gray-800" />
        </button>

        {/* Image - Using object-contain to show full image, max-h for mobile */}
        <div className="relative w-full bg-white/10 backdrop-blur-sm" style={{ aspectRatio: `${width}/${height}`, maxHeight: '80vh' }}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>

        {/* Optional Link Button */}
        {linkUrl && (
          <div className="p-4 bg-white">
            <Button
              onClick={handleLinkClick}
              className="w-full bg-[#003366] hover:bg-[#001a33] text-white font-medium"
            >
              {linkText}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ============================================
// Utility Hook for Marketing Popup Control
// ============================================

/**
 * Hook to programmatically control the marketing popup
 */
export function useMarketingPopup() {
  const [isShown, setIsShown] = useState(false);

  const showPopup = () => {
    const hasShownPopup = sessionStorage.getItem(MARKETING_POPUP_KEY);
    if (!hasShownPopup) {
      setIsShown(true);
    }
  };

  const hidePopup = () => {
    setIsShown(false);
  };

  const resetPopup = () => {
    sessionStorage.removeItem(MARKETING_POPUP_KEY);
    setIsShown(false);
  };

  const forceShowPopup = () => {
    setIsShown(true);
  };

  return {
    isShown,
    showPopup,
    hidePopup,
    resetPopup,
    forceShowPopup,
  };
}

// ============================================
// Export Types
// ============================================

export type { MarketingPopupProps };

