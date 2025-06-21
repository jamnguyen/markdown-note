import type { TypographyVariantsOptions } from '@mui/material/styles';

const typography: TypographyVariantsOptions = {
  fontFamily: '"Courier New", "Monaco", "Consolas", "Lucida Console", monospace',
  h1: {
    fontWeight: 700,
    fontSize: '2.5rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
  },
  h2: {
    fontWeight: 700,
    fontSize: '2rem',
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
  },
  h3: {
    fontWeight: 700,
    fontSize: '1.5rem',
    letterSpacing: '0.03em',
    textTransform: 'uppercase' as const,
  },
  h4: {
    fontWeight: 700,
    fontSize: '1.25rem',
    letterSpacing: '0.02em',
    textTransform: 'uppercase' as const,
  },
  h5: {
    fontWeight: 700,
    fontSize: '1rem',
    letterSpacing: '0.02em',
  },
  h6: {
    fontWeight: 700,
    fontSize: '0.875rem',
    letterSpacing: '0.02em',
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  button: {
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    fontFamily: 'inherit',
    letterSpacing: '0.05em',
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    letterSpacing: '0.02em',
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.02em',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    letterSpacing: '0.02em',
  },
};

export { typography };
