import { styled } from '@mui/material/styles';
import { Box, List, ListItemButton, Button, Typography, IconButton, ListItem, TextField } from '@mui/material';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'width',
})<{ width: number }>(({ theme, width }) => ({
  width,
  background: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.border}`,
  height: '100vh',
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  fontFamily: theme.typography.fontFamily,
  position: 'relative',
  boxShadow: theme.shadows[1],
}));

export const SidebarHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(3),
  fontFamily: theme.typography.fontFamily,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.border}`,
}));

export const SidebarTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.h5.fontWeight,
  fontSize: theme.typography.h5.fontSize,
  letterSpacing: theme.typography.h5.letterSpacing,
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.primary,
}));

export const DragHandle = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: -theme.spacing(0.5),
  width: theme.spacing(1),
  height: '100%',
  cursor: 'col-resize',
  zIndex: 2,
  backgroundColor: theme.palette.primary.main,
  opacity: 0,
  transition: 'opacity 0.2s ease-in-out',
  borderRadius: theme.spacing(0.5),
  '&:hover': {
    opacity: 0.7,
  },
}));

export const ScrollArea = styled(SimpleBar)(({ theme }) => ({
  flex: 1,
  minHeight: 0,
  backgroundColor: theme.palette.background.paper,
  '.simplebar-scrollbar::before': {
    backgroundColor: theme.palette.primary.main,
  },
}));

export const NotesList = styled(List)(({ theme }) => ({
  padding: theme.spacing(2, 0),
  fontFamily: theme.typography.fontFamily,
}));

export const NoteListItem = styled(ListItemButton)<{ selected: boolean }>(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.retro.purple : 'transparent',
  fontWeight: selected ? theme.typography.h6.fontWeight : theme.typography.body1.fontWeight,
  borderRadius: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  fontFamily: theme.typography.fontFamily,
  padding: theme.spacing(2, 3),
  border: selected ? `1px solid ${theme.palette.primary.main}` : `1px solid transparent`,
  margin: theme.spacing(0.5, 2),
  boxShadow: 'none',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[1],
  },
}));

export const NoteTitleRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  minWidth: 0,
}));

export const NoteTitleEditIcon = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.secondary,
  padding: theme.spacing(0.5),
  borderRadius: theme.spacing(1),
  backgroundColor: 'transparent',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transform: 'scale(1.05)',
  },
}));

export const NoteListItemContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
}));

export const NoteMeta = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.caption.fontSize,
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1),
  fontFamily: theme.typography.fontFamily,
  letterSpacing: theme.typography.caption.letterSpacing,
}));

export const DeleteIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  color: theme.palette.error.main,
  backgroundColor: 'transparent',
  borderRadius: theme.spacing(1),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    transform: 'scale(1.05)',
  },
}));

export const NoteSidebarTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.subtitle1.fontSize,
  fontWeight: theme.typography.subtitle1.fontWeight,
  letterSpacing: theme.typography.subtitle1.letterSpacing,
  fontFamily: theme.typography.fontFamily,
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const AboutButton = styled('button')(({ theme }) => ({
  background: 'none',
  border: `1px solid ${theme.palette.border}`,
  padding: theme.spacing(1.5, 3),
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.primary,
  marginTop: theme.spacing(1),
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'all 0.2s ease-in-out',
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.button.fontWeight,
  letterSpacing: theme.typography.button.letterSpacing,
  textTransform: theme.typography.button.textTransform,
  borderRadius: theme.spacing(1.5),
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[1],
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

export const PasswordButton = styled('button')(({ theme }) => ({
  background: 'none',
  border: `1px solid ${theme.palette.secondary.main}`,
  padding: theme.spacing(1.5, 3),
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.secondary.main,
  marginTop: theme.spacing(1),
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'all 0.2s ease-in-out',
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.button.fontWeight,
  letterSpacing: theme.typography.button.letterSpacing,
  textTransform: theme.typography.button.textTransform,
  borderRadius: theme.spacing(1.5),
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    borderColor: theme.palette.secondary.main,
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[1],
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 3, 2),
  overflow: 'hidden',
  transition: 'max-height 0.2s ease-in-out, opacity 0.2s ease-in-out',
  maxHeight: 0,
  opacity: 0,
  backgroundColor: theme.palette.background.paper,
  '&.visible': {
    maxHeight: theme.spacing(12),
    opacity: 1,
  },
  '& .MuiInputBase-root': {
    borderRadius: theme.spacing(1.5),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.border}`,
    fontFamily: theme.typography.fontFamily,
    '&.Mui-focused': {
      borderRadius: theme.spacing(1.5),
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
    },
  },
}));

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

export const ActionButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  position: 'absolute',
  right: theme.spacing(2),
  top: '50%',
  transform: 'translateY(-50%)',
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
  zIndex: 1,
}));

export const NoteTitleTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    fontSize: theme.typography.subtitle1.fontSize,
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(1.5),
    '&.Mui-focused': {
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
    },
  },
}));

export const RetroIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  backgroundColor: 'transparent',
  borderRadius: theme.spacing(1),
  color: theme.palette.primary.main,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transform: 'scale(1.05)',
  },
}));

export const BottomSection = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.border}`,
}));
