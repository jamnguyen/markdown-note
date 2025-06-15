import type { Components, Theme } from '@mui/material';

const MuiButton: Components['MuiButton'] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: (props) => {
      const theme = props.theme as Theme;
      return {
        borderRadius: 12,
        boxShadow: theme.shadows[1],
        fontWeight: 700,
        fontFamily: theme.typography.fontFamily,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: `2px solid ${theme.palette.primary.main}`,
        transition: 'all 0.2s',
        '&:hover': {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.text.primary,
          borderColor: theme.palette.secondary.main,
        },
      };
    },
  },
};

export { MuiButton };
