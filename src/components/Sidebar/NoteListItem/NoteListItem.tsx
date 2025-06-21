import React from 'react';
import { PencilSimple, Trash } from 'phosphor-react';
import {
  NoteListItemWrapper,
  NoteListItem as StyledNoteListItem,
  NoteListItemContent,
  NoteContentBox,
  NoteTitleRow,
  NoteSidebarTitle,
  NoteMeta,
  ActionButtonsContainer,
  NoteTitleEditIcon,
  DeleteIconButton,
  NoteTitleTextField,
} from './NoteListItem.styled';
import type { NoteListItemProps } from './NoteListItem.types';

export const NoteListItem: React.FC<NoteListItemProps> = ({
  note,
  isSelected,
  isEditing,
  editingValue,
  onSelect,
  onEdit,
  onDelete,
  onTitleChange,
  onTitleSave,
  onTitleCancel,
}) => {
  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onTitleSave(note.id);
    } else if (e.key === 'Escape') {
      onTitleCancel();
    }
  };

  return (
    <NoteListItemWrapper
      key={note.id}
      disablePadding
      secondaryAction={
        isEditing ? null : (
          <ActionButtonsContainer className='action-buttons'>
            <NoteTitleEditIcon
              onClick={(e) => {
                e.stopPropagation();
                onEdit(note.id, note.title || 'Untitled');
              }}>
              <PencilSimple size={14} />
            </NoteTitleEditIcon>
            <DeleteIconButton
              edge='end'
              aria-label='delete'
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}>
              <Trash size={16} weight='bold' />
            </DeleteIconButton>
          </ActionButtonsContainer>
        )
      }>
      <StyledNoteListItem selected={isSelected} onClick={() => onSelect(note.id)}>
        <NoteListItemContent>
          <NoteContentBox>
            <NoteTitleRow>
              {isEditing ? (
                <NoteTitleTextField
                  value={editingValue}
                  onChange={(e) => onTitleChange(e.target.value)}
                  onBlur={() => onTitleSave(note.id)}
                  onKeyDown={handleTitleKeyDown}
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
          </NoteContentBox>
        </NoteListItemContent>
      </StyledNoteListItem>
    </NoteListItemWrapper>
  );
};
