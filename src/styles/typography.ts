import type { TypographyVariantsOptions } from '@mui/material/styles';

const typography: TypographyVariantsOptions = {
  fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: {
    fontWeight: 800,
    fontSize: '2.5rem',
    letterSpacing: '-0.025em',
    lineHeight: 1.2,
  },
  h2: {
    fontWeight: 700,
    fontSize: '2rem',
    letterSpacing: '-0.025em',
    lineHeight: 1.3,
  },
  h3: {
    fontWeight: 700,
    fontSize: '1.5rem',
    letterSpacing: '-0.02em',
    lineHeight: 1.4,
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.25rem',
    letterSpacing: '-0.015em',
    lineHeight: 1.4,
  },
  h5: {
    fontWeight: 600,
    fontSize: '1rem',
    letterSpacing: '-0.01em',
    lineHeight: 1.5,
  },
  h6: {
    fontWeight: 600,
    fontSize: '0.875rem',
    letterSpacing: '-0.01em',
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.7,
    letterSpacing: '0.01em',
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: '0.01em',
  },
  button: {
    fontWeight: 500,
    textTransform: 'none' as const,
    fontFamily: 'inherit',
    letterSpacing: '0.01em',
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    letterSpacing: '0.01em',
    lineHeight: 1.6,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.01em',
    lineHeight: 1.5,
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    letterSpacing: '0.02em',
    lineHeight: 1.4,
  },
};

export { typography };
