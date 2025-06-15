import { styled } from '@mui/material/styles';
import { Box, List, ListItemButton, Button, Typography, IconButton } from '@mui/material';

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
}));

export const SidebarHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  fontFamily: theme.typography.fontFamily,
}));

export const SidebarTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: theme.typography.h4.fontSize,
  fontFamily: theme.typography.fontFamily,
}));

export const DragHandle = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  width: 6,
  height: '100%',
  cursor: 'col-resize',
  zIndex: 2,
  background: 'transparent',
  transition: 'background 0.2s',
  '&:hover': {
    background: theme.palette.action.hover,
  },
}));

export const NotesList = styled(List)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: 0,
  fontFamily: theme.typography.fontFamily,
  minHeight: 0,
  scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: 8,
    background: 'transparent',
  },
  '&:hover::-webkit-scrollbar-thumb': {
    background: 'rgba(0,0,0,0.2)',
  },
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

export const NoteTitleEditIcon = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  opacity: 0,
  transition: 'opacity 0.2s',
  cursor: 'pointer',
  marginLeft: theme.spacing(0.5),
  '&:hover': {
    opacity: 1,
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

export const NoteMeta = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 12,
  marginTop: theme.spacing(0.5),
  whiteSpace: 'nowrap',
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
  transition: 'background 0.2s, color 0.2s',
  '&:hover': {
    background: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
}));

export const NoteSidebarTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: theme.typography.body1.fontSize,
  fontFamily: theme.typography.fontFamily,
  flexGrow: 0,
  flexShrink: 1,
}));

export const CreditText = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 11,
  textAlign: 'left',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(0.5),
  opacity: 0.7,
}));
