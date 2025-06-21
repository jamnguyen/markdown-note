import React, { useState, useMemo } from 'react';
import type { SidebarProps } from './Sidebar.types';
import {
  SidebarContainer,
  NotesList,
  DragHandle,
  SidebarHeader,
  SidebarTitle,
  ScrollArea,
  RetroIconButton,
  BottomSection,
  AboutButton,
  HeaderButtonsContainer,
} from './Sidebar.styled';
import { Plus } from 'phosphor-react';
import { ThemePicker } from './ThemePicker';
import { SearchBar } from './SearchBar';
import { NoteListItem } from './NoteListItem';
import { ConfirmDialog } from './ConfirmDialog';
import { AboutDialog } from './AboutDialog';

declare const __APP_NAME__: string;
declare const __APP_VERSION__: string;

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

  const handleTitleEdit = (id: string, title: string) => {
    setEditingId(id);
    setEditingValue(title);
  };

  const handleTitleChange = (value: string) => {
    setEditingValue(value);
  };

  const handleTitleSave = (id: string) => {
    if (onUpdateTitle && editingValue.trim() !== '') {
      onUpdateTitle(id, editingValue);
    }
    setEditingId(null);
  };

  const handleTitleCancel = () => {
    setEditingId(null);
  };

  const handleThemeChange = (newMode: 'light' | 'dark' | 'system') => {
    setMode(newMode);
  };

  const sortedAndFilteredNotes = useMemo(() => {
    return [...notes]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [notes, searchQuery]);

  return (
    <SidebarContainer width={width}>
      <DragHandle onMouseDown={onDragHandleMouseDown} />
      <SidebarHeader>
        <SidebarTitle>Markdown Notes</SidebarTitle>
        <HeaderButtonsContainer>
          <RetroIconButton onClick={onCreate} size='small'>
            <Plus size={16} weight='bold' />
          </RetroIconButton>
        </HeaderButtonsContainer>
      </SidebarHeader>

      {notes.length > 0 && <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder='Search notes...' />}

      <ScrollArea>
        <NotesList>
          {sortedAndFilteredNotes.map((note) => (
            <NoteListItem
              key={note.id}
              note={note}
              isSelected={note.id === selectedNoteId}
              isEditing={editingId === note.id}
              editingValue={editingValue}
              onSelect={onSelect}
              onEdit={handleTitleEdit}
              onDelete={handleDeleteClick}
              onTitleChange={handleTitleChange}
              onTitleSave={handleTitleSave}
              onTitleCancel={handleTitleCancel}
            />
          ))}
        </NotesList>
      </ScrollArea>

      <BottomSection>
        <ThemePicker mode={mode} onChange={handleThemeChange} />
        <AboutButton onClick={handleAboutClick}>About</AboutButton>
      </BottomSection>

      <ConfirmDialog
        open={deleteDialogOpen}
        title='Delete Note?'
        message='Are you sure you want to delete this note? This action cannot be undone.'
        confirmText='Delete'
        confirmColor='warning'
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <AboutDialog
        open={aboutDialogOpen}
        onClose={handleAboutClose}
        appName={__APP_NAME__}
        appVersion={__APP_VERSION__}
        author='Jam Nguyen'
      />
    </SidebarContainer>
  );
};
