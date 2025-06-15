import { styled } from '@mui/material/styles';
import { Box, List, ListItemButton, Button } from '@mui/material';

export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 280,
  background: theme.palette.background.paper,
  borderRight: `1.5px solid ${theme.palette.border}`,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

export const NotesList = styled(List)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: 0,
}));

export const NoteListItem = styled(ListItemButton)<{ selected: boolean }>(({ theme, selected }) => ({
  borderLeft: selected ? `4px solid ${theme.palette.primary.main}` : '4px solid transparent',
  background: selected ? theme.palette.action.selected : 'transparent',
  fontWeight: selected ? 700 : 400,
  borderRadius: 0,
  marginBottom: 2,
  '&:hover': {
    background: theme.palette.action.hover,
  },
}));

export const CreateButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  fontWeight: 700,
}));
