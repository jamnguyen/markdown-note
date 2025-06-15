import type { Components, Theme } from '@mui/material';

const MuiCard: Components['MuiCard'] = {
  styleOverrides: {
    root: (props) => {
      const theme = props.theme as Theme;
      return {
        borderRadius: 20,
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        border: `1.5px solid ${theme.palette.border}`,
        fontFamily: theme.typography.fontFamily,
      };
    },
  },
};

export { MuiCard };
