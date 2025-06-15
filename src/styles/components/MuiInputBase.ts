import type { Components, Theme } from '@mui/material';

const MuiInputBase: Components['MuiInputBase'] = {
  styleOverrides: {
    root: (props) => {
      const theme = props.theme as Theme;
      return {
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.text.primary,
      };
    },
  },
};

export { MuiInputBase };
