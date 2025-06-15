import React, { useState } from 'react';
import type { SidebarProps } from './Sidebar.types';
import {
  SidebarContainer,
  NotesList,
  NoteListItem,
  DragHandle,
  SidebarHeader,
  SidebarTitle,
  NoteSidebarTitle,
  NoteMeta,
  NoteListItemContent,
  DeleteIconButton,
  CreditText,
  NoteTitleRow,
  NoteTitleEditIcon,
} from './Sidebar.styled';
import {
  ListItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  TextField,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { Trash, Plus, PencilSimple, Sun, Moon, Desktop } from 'phosphor-react';

export const Sidebar: React.FC<SidebarProps> = ({
  notes,
  selectedNoteId,
  onSelect,
  onCreate,
  onDelete,
  width,
  onDragHandleMouseDown,
  mode,
  setMode,
  onUpdateTitle,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');

  const handleDeleteClick = (id: string) => {
    setPendingDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteId) {
      onDelete(pendingDeleteId);
    }
    setDeleteDialogOpen(false);
    setPendingDeleteId(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setPendingDeleteId(null);
  };

  const handleTitleEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditingValue(title);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value);
  };

  const handleTitleBlur = (id: string) => {
    if (onUpdateTitle && editingValue.trim() !== '') {
      onUpdateTitle(id, editingValue);
    }
    setEditingId(null);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') {
      handleTitleBlur(id);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  return (
    <SidebarContainer width={width}>
      <DragHandle onMouseDown={onDragHandleMouseDown} />
      <SidebarHeader>
        <SidebarTitle variant='h4'>Markdown Notes</SidebarTitle>
        <IconButton color='primary' onClick={onCreate} size='small'>
          <Plus size={20} weight='bold' />
        </IconButton>
      </SidebarHeader>
      <NotesList>
        {notes.map((note) => (
          <ListItem
            key={note.id}
            disablePadding
            secondaryAction={
              <DeleteIconButton
                edge='end'
                aria-label='delete'
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(note.id);
                }}>
                <Trash size={20} weight='bold' />
              </DeleteIconButton>
            }>
            <NoteListItem selected={note.id === selectedNoteId} onClick={() => onSelect(note.id)}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <NoteListItemContent>
                  {editingId === note.id ? (
                    <TextField
                      value={editingValue}
                      onChange={handleTitleChange}
                      onBlur={() => handleTitleBlur(note.id)}
                      onKeyDown={(e) => handleTitleKeyDown(e as React.KeyboardEvent<HTMLInputElement>, note.id)}
                      size='small'
                      autoFocus
                      fullWidth
                      variant='standard'
                    />
                  ) : (
                    <NoteTitleRow>
                      <NoteSidebarTitle
                        variant='body2'
                        sx={{ cursor: 'pointer', flex: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(note.id);
                        }}>
                        {note.title || 'Untitled'}
                      </NoteSidebarTitle>
                      <NoteTitleEditIcon
                        className='note-title-edit-icon'
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTitleEdit(note.id, note.title || 'Untitled');
                        }}>
                        <Tooltip title='Edit title'>
                          <PencilSimple size={16} />
                        </Tooltip>
                      </NoteTitleEditIcon>
                    </NoteTitleRow>
                  )}
                  <NoteMeta>{new Date(note.updatedAt).toLocaleString()}</NoteMeta>
                </NoteListItemContent>
              </Box>
            </NoteListItem>
          </ListItem>
        ))}
      </NotesList>
      <Box sx={{ mt: 'auto', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <ToggleButtonGroup value={mode} exclusive onChange={(_, value) => value && setMode(value)} size='small'>
          <ToggleButton value='light'>
            <Sun size={16} />
          </ToggleButton>
          <ToggleButton value='dark'>
            <Moon size={16} />
          </ToggleButton>
          <ToggleButton value='system'>
            <Desktop size={16} />
          </ToggleButton>
        </ToggleButtonGroup>
        <CreditText>Version {process.env.npm_package_version}</CreditText>
      </Box>
      <Dialog open={deleteDialogOpen} onClose={handleCancelDelete}>
        <DialogTitle>Delete Note?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this note? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color='error' variant='contained'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </SidebarContainer>
  );
};
