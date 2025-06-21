import { styled } from '@mui/material/styles';
import { Box, TextField } from '@mui/material';

export const SearchContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2, 2, 2),
  backgroundColor: theme.palette.background.paper,
  flexShrink: 0,
  '& .MuiInputBase-root': {
    borderRadius: theme.spacing(0.75),
    backgroundColor: theme.palette.background.paper,
    fontFamily: theme.typography.fontFamily,
    '&.Mui-focused': {
      outline: 'none',
      boxShadow: 'none',
    },
  },
  '& .MuiInput-underline:before': {
    borderBottom: `1px solid ${theme.palette.border}`,
  },
  '& .MuiInput-underline:after': {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    borderBottomWidth: '1px',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottom: `1px solid ${theme.palette.border}`,
  },
}));

export const StyledTextField = styled(TextField)(() => ({
  '& .MuiInputBase-root': {
    height: 32,
    fontSize: '0.875rem',
  },
}));
