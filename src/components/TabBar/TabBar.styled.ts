import { styled } from '@mui/material/styles';
import { Box, IconButton, Typography } from '@mui/material';

export const TabBarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 1, 2),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.border}`,
  flexShrink: 0,
  minHeight: '56px', // Match the SidebarHeader height from design
  fontFamily: theme.typography.fontFamily,
}));

export const TabBarActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
}));

export const ExportButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.75),
  backgroundColor: 'transparent',
  borderRadius: theme.spacing(0.75),
  color: theme.palette.primary.main,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: `${theme.palette.primary.main}30`,
    color: theme.palette.primary.main,
  },
}));

export const NoteTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.secondary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '200px',
}));
