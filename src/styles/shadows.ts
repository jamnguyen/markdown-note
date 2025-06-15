import type { ThemeOptions } from '@mui/material/styles';

const shadows = [
  'none',
  '0px 2px 8px 0px rgba(44, 44, 44, 0.08)',
  '0px 4px 16px 0px rgba(44, 44, 44, 0.10)',
  ...Array.from({ length: 22 }, () => '0px 2px 8px 0px rgba(44, 44, 44, 0.08)'),
] as ThemeOptions['shadows'];

export { shadows };
