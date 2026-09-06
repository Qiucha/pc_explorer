import { useState, useEffect } from 'react';

export interface WindowDimensions {
  width: number;
  height: number;
  windowAspectRatio: number;
  category: 'ultrawide' | 'widescreen' | 'standard' | 'square' | 'portrait';
  /** Computed dynamic aspect ratio numerical value (e.g. 1.6, 1.4, 0.814) */
  dynamicRatio: number;
  /** Formatted CSS aspect-ratio string (e.g. "16 / 10", "7 / 5", "700 / 860") */
  dynamicRatioStr: string;
  /** Human-readable aspect ratio label for UI badges */
  ratioLabel: string;
  /** Recommended canvas height in pixels based on window height and aspect ratio */
  canvasHeight: number;
  /** Max height constraint */
  maxCanvasHeight: string;
  /** Min height constraint */
  minCanvasHeight: number;
  /** Recommended inspector container height */
  inspectorHeight: number;
  isPortrait: boolean;
  isUltraWide: boolean;
  isWide: boolean;
}

/**
 * Calculates the dynamic aspect ratio based on window width, height, and aspect ratio.
 */
export function getDynamicRatioDetails(width: number, height: number): {
  category: 'ultrawide' | 'widescreen' | 'standard' | 'square' | 'portrait';
  ratio: number;
  ratioStr: string;
  label: string;
} {
  const windowAr = width / Math.max(height, 1);

  // In portrait or small screens (e.g. mobile/vertical monitors), match the motherboard's native 700:860 ratio
  if (width < 1024 || windowAr < 0.95) {
    return {
      category: 'portrait',
      ratio: 700 / 860,
      ratioStr: '700 / 860',
      label: '4:5 (Portrait)'
    };
  }

  // Ultrawide monitors (21:9, 32:9, etc.)
  if (windowAr >= 2.05) {
    return {
      category: 'ultrawide',
      ratio: 16 / 10,
      ratioStr: '16 / 10',
      label: '16:10 (Ultrawide)'
    };
  }

  // Standard 16:9 or 16:10 widescreen desktop displays
  if (windowAr >= 1.6) {
    return {
      category: 'widescreen',
      ratio: 1.4,
      ratioStr: '7 / 5',
      label: '7:5 (Widescreen)'
    };
  }

  // Standard/laptop screens (3:2, 4:3, split screen)
  if (windowAr >= 1.25) {
    return {
      category: 'standard',
      ratio: 1.25,
      ratioStr: '5 / 4',
      label: '5:4 (Standard)'
    };
  }

  // Squarish windows (tiled, ~1:1)
  return {
    category: 'square',
    ratio: 1.05,
    ratioStr: '21 / 20',
    label: '1:1 (Square)'
  };
}

export function computeWindowDimensions(width: number, height: number): WindowDimensions {
  const windowAspectRatio = width / Math.max(height, 1);
  const { category, ratio, ratioStr, label } = getDynamicRatioDetails(width, height);

  const isDesktop = width >= 1024;
  let canvasHeight: number;
  let maxCanvasHeight: string;
  let minCanvasHeight: number;

  if (isDesktop) {
    // Dynamic canvas height tracks window height with sensible boundaries
    canvasHeight = Math.max(500, Math.min(Math.round(height - 215), 900));
    maxCanvasHeight = 'min(calc(100vh - 180px), 920px)';
    minCanvasHeight = 500;
  } else {
    // Tablet/mobile stacked height
    canvasHeight = Math.max(400, Math.min(Math.round(height * 0.52), 640));
    maxCanvasHeight = 'min(calc(60vh), 650px)';
    minCanvasHeight = 380;
  }

  // Inspector height aligns with Canvas + Gap + PartTray in desktop mode
  const inspectorHeight = isDesktop ? canvasHeight + 84 : Math.min(height * 0.6, 700);

  return {
    width,
    height,
    windowAspectRatio,
    category,
    dynamicRatio: ratio,
    dynamicRatioStr: ratioStr,
    ratioLabel: label,
    canvasHeight,
    maxCanvasHeight,
    minCanvasHeight,
    inspectorHeight,
    isPortrait: windowAspectRatio < 0.95 || width < 1024,
    isUltraWide: windowAspectRatio >= 2.05,
    isWide: windowAspectRatio >= 1.6
  };
}

export function useWindowDimensions(): WindowDimensions {
  const [dimensions, setDimensions] = useState<WindowDimensions>(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const height = typeof window !== 'undefined' ? window.innerHeight : 900;
    return computeWindowDimensions(width, height);
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDimensions(computeWindowDimensions(window.innerWidth, window.innerHeight));
      }, 30);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return dimensions;
}
