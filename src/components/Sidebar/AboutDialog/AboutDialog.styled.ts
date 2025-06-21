import { styled } from '@mui/material/styles';
import { DialogTitle, DialogContentText, IconButton, Typography, Box } from '@mui/material';

export const StyledDialogTitle = styled(DialogTitle)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const StyledDialogContentText = styled(DialogContentText)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const CloseIconButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const DialogTitleText = styled(Typography)(() => ({
  fontFamily: '"Cal Sans", system-ui, -apple-system, sans-serif',
}));

export const InfoBox = styled(Box)(() => ({
  // No additional styling needed, just for semantic purposes
}));

export const LinkBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const StyledLink = styled('a')(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  transition: 'color 0.2s ease-in-out',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));
