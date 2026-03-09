'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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

const DEFAULT_IMAGE = '/images/marketing-popup.jpg';

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

  // Don't render anything if popup is not open
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="relative z-10 bg-white rounded-lg shadow-2xl overflow-hidden"
        style={{
          width: `${width}px`,
          maxWidth: '90vw',
          height: 'auto',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="marketing-popup-title"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 z-20 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
          aria-label="Close popup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-800"
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

        {/* Image */}
        <div className="relative" style={{ aspectRatio: `${width}/${height}` }}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>

        {/* Optional Link Button */}
        {linkUrl && (
          <div className="p-4 bg-white">
            <button
              onClick={handleLinkClick}
              className="w-full py-3 px-6 bg-[#003366] hover:bg-[#001a33] text-white font-medium rounded-md transition-colors"
            >
              {linkText}
            </button>
          </div>
        )}
      </div>
    </div>
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

