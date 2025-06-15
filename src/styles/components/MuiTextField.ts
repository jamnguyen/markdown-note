import type { Components, Theme } from '@mui/material';

const MuiTextField: Components['MuiTextField'] = {
  styleOverrides: {
    root: (props) => {
      const theme = props.theme as Theme;
      return {
        background: theme.palette.background.paper,
        borderRadius: 8,
        fontFamily: theme.typography.fontFamily,
      };
    },
  },
};

export { MuiTextField };
