import type { Components, Theme } from '@mui/material';

const MuiButton: Components['MuiButton'] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: (props) => {
      const theme = props.theme as Theme;
      return {
        borderRadius: theme.spacing(0.75),
        fontWeight: theme.typography.button.fontWeight,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.button.fontSize,
        letterSpacing: theme.typography.button.letterSpacing,
        textTransform: theme.typography.button.textTransform,
        boxShadow: 'none',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: 'none',
        },
        '&.MuiButton-contained': {
          '&:hover': {
            backgroundColor: `${theme.palette.primary.main}80`,
          },
        },
        '&.MuiButton-containedWarning': {
          backgroundColor: 'transparent',
          color: theme.palette.warning.main,
          border: 'none',
          '&:hover': {
            backgroundColor: `${theme.palette.warning.main}20`,
            color: theme.palette.warning.main,
          },
        },
        '&.MuiButton-outlined': {
          '&:hover': {
            backgroundColor: `${theme.palette.primary.main}20`,
            borderColor: theme.palette.primary.main,
          },
        },
        '&.MuiButton-text': {
          '&:hover': {
            backgroundColor: `${theme.palette.primary.main}20`,
          },
        },
      };
    },
  },
};

export { MuiButton };
