import React, { useState, useMemo } from 'react';
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
  AboutButton,
  NoteTitleRow,
  NoteTitleEditIcon,
  SearchContainer,
  ScrollArea,
  NoteListItemWrapper,
  ActionButtonsContainer,
  NoteTitleTextField,
} from './Sidebar.styled';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  InputAdornment,
} from '@mui/material';
import { Trash, Plus, PencilSimple, Sun, Moon, Desktop, MagnifyingGlass, X } from 'phosphor-react';

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
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [aboutDialogOpen, setAboutDialogOpen] = useState(false);

  const handleDeleteClick = (id: string) => {
    setNoteToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (noteToDelete) {
      onDelete(noteToDelete);
      setDeleteDialogOpen(false);
      setNoteToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setNoteToDelete(null);
  };

  const handleAboutClick = () => {
    setAboutDialogOpen(true);
  };

  const handleAboutClose = () => {
    setAboutDialogOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchQuery('');
    }
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

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, id: string) => {
    if (e.key === 'Enter') {
      handleTitleBlur(id);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  const sortedAndFilteredNotes = useMemo(() => {
    return [...notes]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [notes, searchQuery]);

  return (
    <SidebarContainer width={width}>
      <DragHandle onMouseDown={onDragHandleMouseDown} />
      <SidebarHeader>
        <SidebarTitle variant='h4'>Markdown Notes</SidebarTitle>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton color='primary' onClick={toggleSearch} size='small' sx={{ padding: '4px' }}>
            <MagnifyingGlass size={14} weight='bold' />
          </IconButton>
          <IconButton color='primary' onClick={onCreate} size='small' sx={{ padding: '4px' }}>
            <Plus size={14} weight='bold' />
          </IconButton>
        </Box>
      </SidebarHeader>
      <SearchContainer className={searchOpen ? 'visible' : ''}>
        <TextField
          size='small'
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search notes...'
          sx={{
            '& .MuiInputBase-root': {
              height: 32,
              fontSize: '0.875rem',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <MagnifyingGlass size={14} />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position='end'>
                <IconButton size='small' onClick={() => setSearchQuery('')} sx={{ padding: '2px' }}>
                  <X size={12} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </SearchContainer>
      <ScrollArea>
        <NotesList>
          {sortedAndFilteredNotes.map((note) => (
            <NoteListItemWrapper
              key={note.id}
              disablePadding
              secondaryAction={
                <ActionButtonsContainer className='action-buttons'>
                  <NoteTitleEditIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTitleEdit(note.id, note.title || 'Untitled');
                    }}>
                    <PencilSimple size={12} />
                  </NoteTitleEditIcon>
                  <DeleteIconButton
                    edge='end'
                    aria-label='delete'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(note.id);
                    }}>
                    <Trash size={14} weight='bold' />
                  </DeleteIconButton>
                </ActionButtonsContainer>
              }>
              <NoteListItem selected={note.id === selectedNoteId} onClick={() => onSelect(note.id)}>
                <NoteListItemContent>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <NoteTitleRow>
                      {editingId === note.id ? (
                        <NoteTitleTextField
                          value={editingValue}
                          onChange={handleTitleChange}
                          onBlur={() => handleTitleBlur(note.id)}
                          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handleTitleKeyDown(e, note.id)}
                          size='small'
                          autoFocus
                          fullWidth
                          variant='standard'
                        />
                      ) : (
                        <NoteSidebarTitle>{note.title || 'Untitled'}</NoteSidebarTitle>
                      )}
                    </NoteTitleRow>
                    <NoteMeta>{new Date(note.updatedAt).toLocaleString()}</NoteMeta>
                  </Box>
                </NoteListItemContent>
              </NoteListItem>
            </NoteListItemWrapper>
          ))}
        </NotesList>
      </ScrollArea>
      <Box sx={{ mt: 'auto', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, value) => value && setMode(value)}
          size='small'
          sx={{
            '& .MuiToggleButton-root': {
              padding: '4px',
            },
          }}>
          <ToggleButton value='light'>
            <Sun size={14} />
          </ToggleButton>
          <ToggleButton value='dark'>
            <Moon size={14} />
          </ToggleButton>
          <ToggleButton value='system'>
            <Desktop size={14} />
          </ToggleButton>
        </ToggleButtonGroup>
        <AboutButton onClick={handleAboutClick}>About</AboutButton>
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

      <Dialog open={aboutDialogOpen} onClose={handleAboutClose}>
        <DialogTitle>About Markdown Note</DialogTitle>
        <DialogContent>
          <DialogContentText component='div' sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <strong>App Name:</strong> {__APP_NAME__}
            </Box>
            <Box>
              <strong>Version:</strong> {__APP_VERSION__}
            </Box>
            <Box>
              <strong>Author:</strong> Jam Nguyen
            </Box>
            <Box sx={{ mt: 2 }}>
              <a
                href='https://www.flaticon.com/free-icons/sticky-notes'
                title='sticky notes icons'
                target='_blank'
                rel='noopener noreferrer'
                style={{ color: 'inherit', textDecoration: 'none' }}>
                Sticky notes icons created by Freepik - Flaticon
              </a>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAboutClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </SidebarContainer>
  );
};
