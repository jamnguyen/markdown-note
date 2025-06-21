import { styled } from '@mui/material/styles';
import { Box, ListItem, ListItemButton, Typography, TextField, IconButton } from '@mui/material';

export const NoteListItemWrapper = styled(ListItem)(({ theme }) => ({
  position: 'relative',
  padding: 0,
  margin: theme.spacing(0.5, 0),
  '&:hover': {
    '& .action-buttons': {
      opacity: 1,
      visibility: 'visible',
    },
  },
}));

export const NoteListItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.spacing(0.75),
  margin: theme.spacing(0.5, 0),
  padding: theme.spacing(1.5),
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  fontFamily: theme.typography.fontFamily,
  transition: 'all 0.05s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark || theme.palette.primary.main,
    },
  },
}));

export const NoteListItemContent = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  width: '100%',
}));

export const NoteContentBox = styled(Box)(() => ({
  flex: 1,
  minWidth: 0,
}));

export const NoteTitleRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 4,
}));

export const NoteSidebarTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: 'inherit',
  fontFamily: theme.typography.fontFamily,
  letterSpacing: theme.typography.body2.letterSpacing,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1,
}));

export const NoteMeta = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.25),
  fontFamily: theme.typography.fontFamily,
  letterSpacing: theme.typography.caption.letterSpacing,
}));

export const ActionButtonsContainer = styled(Box)(() => ({
  display: 'flex',
  gap: 4,
  opacity: 0,
  visibility: 'hidden',
  transition: 'all 0.2s ease-in-out',
}));

export const NoteTitleEditIcon = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  backgroundColor: 'transparent',
  borderRadius: theme.spacing(0.75),
  color: theme.palette.primary.main,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}30`,
    color: theme.palette.primary.main,
  },
}));

export const DeleteIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  color: theme.palette.error.main,
  backgroundColor: 'transparent',
  borderRadius: theme.spacing(0.5),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: `${theme.palette.error.main}30`,
    color: theme.palette.error.main,
  },
}));

export const NoteTitleTextField = styled(TextField)(({ theme }) => ({
  '&.MuiTextField-root': {
    backgroundColor: 'transparent',
    marginBottom: theme.spacing(0.5),
  },
  '& .MuiInputBase-root': {
    fontSize: '0.875rem',
    fontFamily: theme.typography.fontFamily,
    borderRadius: theme.spacing(0.75),
    backgroundColor: 'transparent',
    '&.Mui-focused': {
      outline: 'none',
      boxShadow: 'none',
    },
  },
  '& .MuiInput-underline:before': {
    borderBottom: `1px solid ${theme.palette.border}`,
  },
  '& .MuiInput-underline:after': {
    borderBottomWidth: '1px',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottom: `1px solid ${theme.palette.border}`,
  },
  '.MuiInputBase-inputSizeSmall': {
    paddingBottom: 0,
  },
}));
