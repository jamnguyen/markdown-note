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
  PasswordButton,
  NoteTitleRow,
  NoteTitleEditIcon,
  SearchContainer,
  ScrollArea,
  NoteListItemWrapper,
  ActionButtonsContainer,
  NoteTitleTextField,
  RetroIconButton,
  BottomSection,
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
  isEncrypted,
  onPasswordSetup,
  onPasswordManagement,
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

  const handlePasswordClick = () => {
    if (isEncrypted) {
      onPasswordManagement?.();
    } else {
      onPasswordSetup?.();
    }
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
        <Box sx={{ display: 'flex', gap: 1 }}>
          <RetroIconButton onClick={toggleSearch} size='small'>
            <MagnifyingGlass size={16} weight='bold' />
          </RetroIconButton>
          <RetroIconButton onClick={onCreate} size='small'>
            <Plus size={16} weight='bold' />
          </RetroIconButton>
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
                <RetroIconButton size='small' onClick={() => setSearchQuery('')}>
                  <X size={14} />
                </RetroIconButton>
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
                    <PencilSimple size={14} />
                  </NoteTitleEditIcon>
                  <DeleteIconButton
                    edge='end'
                    aria-label='delete'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(note.id);
                    }}>
                    <Trash size={16} weight='bold' />
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
      <BottomSection>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, value) => value && setMode(value)}
          size='small'
          sx={{
            '& .MuiToggleButtonGroup-grouped': {
              '&:not(:first-of-type)': {
                borderRadius: 0,
                borderLeft: 'none',
              },
              '&:first-of-type': {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
              '&:last-of-type': {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              },
            },
            '& .MuiToggleButton-root': {
              padding: (theme) => theme.spacing(1),
              border: (theme) => `1px solid ${theme.palette.border}`,
              backgroundColor: (theme) => theme.palette.background.paper,
              color: (theme) => theme.palette.text.primary,
              borderRadius: (theme) => theme.spacing(1.5),
              fontFamily: (theme) => theme.typography.fontFamily,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.contrastText,
                borderColor: (theme) => theme.palette.primary.main,
                zIndex: 1,
              },
              '&.Mui-selected': {
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.contrastText,
                borderColor: (theme) => theme.palette.primary.main,
                zIndex: 1,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.dark || theme.palette.primary.main,
                },
              },
            },
          }}>
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
        <PasswordButton onClick={handlePasswordClick}>
          {isEncrypted ? 'Change Password' : 'Add Password'}
        </PasswordButton>
        <AboutButton onClick={handleAboutClick}>About</AboutButton>
      </BottomSection>
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
