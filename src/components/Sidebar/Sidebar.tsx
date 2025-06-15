import React from 'react';
import type { SidebarProps } from './Sidebar.types';
import { SidebarContainer, NotesList, NoteListItem, CreateButton } from './Sidebar.styled';
import { ListItem, ListItemText, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Sidebar: React.FC<SidebarProps> = ({ notes, selectedNoteId, onSelect, onCreate, onDelete }) => {
  return (
    <SidebarContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Box component='span' sx={{ fontWeight: 700, fontSize: 20 }}>
          Notes
        </Box>
        <CreateButton variant='contained' color='primary' onClick={onCreate} size='small'>
          +
        </CreateButton>
      </Box>
      <NotesList>
        {notes.map((note) => (
          <ListItem
            key={note.id}
            disablePadding
            secondaryAction={
              <IconButton
                edge='end'
                aria-label='delete'
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note.id);
                }}>
                <DeleteIcon />
              </IconButton>
            }>
            <NoteListItem selected={note.id === selectedNoteId} onClick={() => onSelect(note.id)}>
              <ListItemText
                primary={note.title || 'Untitled'}
                secondary={new Date(note.updatedAt).toLocaleString()}
                primaryTypographyProps={{ fontWeight: note.id === selectedNoteId ? 700 : 400 }}
              />
            </NoteListItem>
          </ListItem>
        ))}
      </NotesList>
    </SidebarContainer>
  );
};

export default Sidebar;
