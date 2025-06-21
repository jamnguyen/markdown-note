import { styled } from '@mui/material/styles';
import { Box, List, ListItemButton, Button, Typography, IconButton, ListItem, TextField } from '@mui/material';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

export const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'width',
})<{ width: number }>(({ theme, width }) => ({
  width,
  background: theme.palette.background.paper,
  borderRight: `1.5px solid ${theme.palette.border}`,
  height: '100vh',
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  fontFamily: theme.typography.fontFamily,
  position: 'relative',
}));

export const SidebarHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  fontFamily: theme.typography.fontFamily,
}));

export const SidebarTitle = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '1.25rem',
}));

export const DragHandle = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: -3,
  width: 6,
  height: '100%',
  cursor: 'col-resize',
  zIndex: 2,
  '&:hover': {
    background: theme.palette.action.hover,
  },
}));

export const ScrollArea = styled(SimpleBar)(() => ({
  flex: 1,
  minHeight: 0,
  '.simplebar-scrollbar::before': {
    background: 'rgba(0,0,0,0.3)',
  },
}));

export const NotesList = styled(List)(({ theme }) => ({
  padding: 0,
  fontFamily: theme.typography.fontFamily,
}));

export const NoteListItem = styled(ListItemButton)<{ selected: boolean }>(({ theme, selected }) => ({
  borderLeft: selected ? `4px solid ${theme.palette.primary.main}` : '4px solid transparent',
  background: selected ? theme.palette.action.selected : 'transparent',
  fontWeight: selected ? 700 : 400,
  borderRadius: 0,
  marginBottom: theme.spacing(0.5),
  fontFamily: theme.typography.fontFamily,

  '&:hover': {
    background: theme.palette.action.hover,
  },
}));

export const NoteTitleRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  minWidth: 0,
}));

export const NoteTitleEditIcon = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.secondary,
  padding: 2,
  borderRadius: 4,
  '&:hover': {
    background: theme.palette.action.hover,
  },
}));

export const NoteListItemContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
  '&:hover .note-title-edit-icon': {
    opacity: 1,
  },
}));

export const NoteMeta = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
}));

export const CreateButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  fontWeight: 700,
  fontFamily: theme.typography.fontFamily,
  transition: 'background 0.2s, color 0.2s',
  '&:hover': {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

export const DeleteIconButton = styled(IconButton)(({ theme }) => ({
  padding: '2px',
  color: theme.palette.error.main,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const NoteSidebarTitle = styled(Typography)(() => ({
  fontSize: '0.875rem',
  fontWeight: 700,
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const CreditText = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1),
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2, 2),
  overflow: 'hidden',
  transition: 'max-height 0.2s ease-in-out, opacity 0.2s ease-in-out',
  maxHeight: 0,
  opacity: 0,
  '&.visible': {
    maxHeight: '50px',
    opacity: 1,
  },
  '& .MuiInputBase-root': {
    borderRadius: theme.spacing(2),
    background: theme.palette.background.paper,
    '&.Mui-focused': {
      borderRadius: theme.spacing(2),
    },
  },
}));

export const NoteListItemWrapper = styled(ListItem)(() => ({
  position: 'relative',
  padding: 0,
  '&:hover': {
    '& .action-buttons': {
      opacity: 1,
    },
  },
}));

export const ActionButtonsContainer = styled(Box)(() => ({
  display: 'flex',
  gap: 4,
  position: 'absolute',
  right: 8,
  top: '50%',
  transform: 'translateY(-50%)',
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
  '.MuiListItem-root:hover &': {
    opacity: 1,
    visibility: 'visible',
  },
}));

export const NoteTitleTextField = styled(TextField)(() => ({
  '& .MuiInputBase-root': {
    fontSize: '0.875rem',
  },
}));
