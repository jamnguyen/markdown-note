import { styled } from '@mui/material/styles';
import { Box, List, ListItemButton, Typography, IconButton } from '@mui/material';
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
  padding: theme.spacing(2, 2, 1, 2),
  fontFamily: theme.typography.fontFamily,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  flexShrink: 0,
}));

export const SidebarTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: theme.typography.h6.fontSize,
  letterSpacing: theme.typography.h6.letterSpacing,
  fontFamily: '"Cal Sans", system-ui, -apple-system, sans-serif',
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
  '.simplebar-scrollbar': {
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
  },
  '&:hover .simplebar-scrollbar': {
    opacity: 1,
  },
  '.simplebar-scrollbar::before': {
    backgroundColor: theme.palette.text.disabled,
    opacity: 0.3,
  },
}));

export const NotesList = styled(List)(({ theme }) => ({
  padding: theme.spacing(0, 0, 2, 0),
  fontFamily: theme.typography.fontFamily,
}));

export const NoteListItem = styled(ListItemButton)<{ selected: boolean }>(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.retro.purple : 'transparent',
  fontWeight: selected ? theme.typography.h6.fontWeight : theme.typography.body1.fontWeight,
  borderRadius: theme.spacing(0.75),
  marginBottom: theme.spacing(0.5),
  fontFamily: theme.typography.fontFamily,
  padding: theme.spacing(1, 2),
  border: 'none',
  margin: theme.spacing(0.5, 1.5),
  boxShadow: 'none',
  transition: 'background-color 0.05s ease-in-out, font-weight 0.05s ease-in-out',
  '&:hover': {
    backgroundColor: selected ? theme.palette.retro.purple : theme.palette.action.hover,
  },
}));

export const NoteTitleRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  minWidth: 0,
}));

export const AboutButton = styled('button')(({ theme }) => ({
  background: 'none',
  border: 'none',
  padding: theme.spacing(0.5, 0),
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'all 0.2s ease-in-out',
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.body2.fontWeight,
  letterSpacing: theme.typography.body2.letterSpacing,
  textTransform: 'none',
  borderRadius: 0,
  backgroundColor: 'transparent',
  boxShadow: 'none',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  '&:active': {
    color: theme.palette.primary.main,
  },
}));

export const RetroIconButton = styled(IconButton)(({ theme }) => ({
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

export const HeaderButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

export const BottomSection = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.border}`,
  flexShrink: 0,
  fontFamily: theme.typography.fontFamily,
}));
