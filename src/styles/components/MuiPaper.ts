import type { Components, Theme } from '@mui/material';

const MuiPaper: Components['MuiPaper'] = {
  styleOverrides: {
    root: (props) => {
      const theme = props.theme as Theme;
      return {
        borderRadius: 16,
        background: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        border: `1.5px solid ${theme.palette.border}`,
        fontFamily: theme.typography.fontFamily,
      };
    },
  },
};

export { MuiPaper };
