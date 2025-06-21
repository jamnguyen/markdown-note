import { styled } from '@mui/material/styles';
import { Box, ToggleButtonGroup } from '@mui/material';

export const ThemePickerContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.border}`,
  borderRadius: theme.spacing(0.75),
  display: 'flex',
  overflow: 'hidden',
}));

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    '&:not(:first-of-type)': {
      borderLeft: 'none',
    },
    '&:first-of-type': {
      borderRadius: 0,
    },
    '&:last-of-type': {
      borderRadius: 0,
    },
  },
  '& .MuiToggleButton-root': {
    padding: theme.spacing(1),
    border: 'none',
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    borderRadius: 0,
    fontFamily: theme.typography.fontFamily,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}20`,
      color: theme.palette.primary.main,
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark || theme.palette.primary.main,
      },
    },
  },
}));
