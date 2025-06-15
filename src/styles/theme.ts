import { createTheme } from '@mui/material/styles';
import palette from './palette';
import { shadows } from './shadows';
import { spacing } from './spacing';
import { typography } from './typography';
import components from './components';
import { breakpoints } from './breakpoints';

const theme = createTheme({
  palette,
  shadows,
  spacing,
  typography,
  components,
  breakpoints,
});

export { theme };
