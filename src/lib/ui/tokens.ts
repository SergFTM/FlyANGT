/**
 * UI Design Tokens
 *
 * TypeScript tokens for consistent styling across the platform.
 * Ultra modern design system: sky white, premium aviation grade.
 * Light mode only for MVP.
 */

/**
 * Color tokens
 */
export const colors = {
  // Base backgrounds
  bg: {
    base: '#ffffff',
    surface: '#f8fafc',
    elevated: '#ffffff',
    muted: '#f1f5f9',
    inverse: '#0f172a',
  },

  // Text colors
  text: {
    primary: '#0f172a',
    secondary: '#475569',
    muted: '#64748b',
    placeholder: '#94a3b8',
    inverse: '#ffffff',
    link: '#2563eb',
  },

  // Border colors
  border: {
    light: '#e2e8f0',
    default: '#cbd5e1',
    focus: '#3b82f6',
    dark: '#94a3b8',
  },

  // Primary blue (aviation sky)
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Accent yellow (premium gold)
  accent: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },

  // Status colors
  success: {
    light: '#dcfce7',
    default: '#22c55e',
    dark: '#16a34a',
    text: '#166534',
  },
  warning: {
    light: '#fef3c7',
    default: '#f59e0b',
    dark: '#d97706',
    text: '#92400e',
  },
  error: {
    light: '#fee2e2',
    default: '#ef4444',
    dark: '#dc2626',
    text: '#991b1b',
  },
  info: {
    light: '#e0f2fe',
    default: '#0ea5e9',
    dark: '#0284c7',
    text: '#075985',
  },

  // Gradients (CSS strings)
  gradient: {
    skyWhite: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #fefce8 100%)',
    heroLight: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #fef3c7 100%)',
    heroDark: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
    primaryBlue: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    accentGold: 'linear-gradient(135deg, #fde047 0%, #f59e0b 100%)',
    glass: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
  },
} as const;

/**
 * Border radius tokens
 */
export const radii = {
  none: '0',
  sm: '0.375rem',    // 6px
  md: '0.5rem',      // 8px
  lg: '0.75rem',     // 12px
  xl: '1rem',        // 16px
  '2xl': '1.5rem',   // 24px
  full: '9999px',
} as const;

/**
 * Spacing scale (in rem)
 */
export const spacing = {
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  8: '2rem',        // 32px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
} as const;

/**
 * Shadow tokens
 */
export const shadows = {
  none: 'none',
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  glow: {
    primary: '0 0 20px rgba(59, 130, 246, 0.3)',
    accent: '0 0 20px rgba(234, 179, 8, 0.3)',
  },
} as const;

/**
 * Typography tokens
 */
export const typography = {
  fontFamily: {
    sans: 'Inter, system-ui, -apple-system, sans-serif',
    mono: 'JetBrains Mono, Menlo, monospace',
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1.15' }],
    '6xl': ['3.75rem', { lineHeight: '1.1' }],
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },
} as const;

/**
 * Animation tokens
 */
export const animation = {
  duration: {
    instant: '0ms',
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const;

/**
 * Z-index scale
 */
export const zIndex = {
  hide: -1,
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  modal: 300,
  popover: 400,
  tooltip: 500,
  toast: 600,
  overlay: 700,
} as const;

/**
 * Breakpoints
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;
