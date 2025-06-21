import { styled } from '@mui/material/styles';
import { DialogTitle, DialogContentText, IconButton, Typography } from '@mui/material';

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
