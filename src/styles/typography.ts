import type { TypographyVariantsOptions } from '@mui/material/styles';

const typography: TypographyVariantsOptions = {
  fontFamily: 'Space Grotesk, IBM Plex Mono, Courier, monospace',
  h1: { fontWeight: 700, fontSize: '2.5rem', letterSpacing: '-0.02em' },
  h2: { fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.02em' },
  h3: { fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.01em' },
  h4: { fontWeight: 700, fontSize: '1.25rem' },
  h5: { fontWeight: 700, fontSize: '1rem' },
  h6: { fontWeight: 700, fontSize: '0.875rem' },
  body1: { fontSize: '1rem', fontWeight: 400 },
  body2: { fontSize: '0.875rem', fontWeight: 400 },
  button: { fontWeight: 700, textTransform: 'none' as const, fontFamily: 'inherit' },
  subtitle1: { fontSize: '1rem', fontWeight: 500 },
  subtitle2: { fontSize: '0.875rem', fontWeight: 500 },
  caption: { fontSize: '0.75rem', fontWeight: 400 },
};

export { typography };
