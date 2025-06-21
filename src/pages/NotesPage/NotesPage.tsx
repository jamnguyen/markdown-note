import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { setNotes, createNote, updateNote, deleteNote, selectNote } from '../../store';
import notesDb from '../../db/notesDb';
import { encryptedNotesDb } from '../../db/encryptedNotesDb';
import { Layout } from '../../components/Layout';
import { Sidebar } from '../../components/Sidebar';
import { NoteEditor } from '../../components/NoteEditor';
import { NoteViewer } from '../../components/NoteViewer';
import { PasswordSetup, PasswordManagement } from '../../components/PasswordSetup';
import { MainArea, EmptyState, EditorColumn } from './NotesPage.styled';
import { Typography } from '@mui/material';

type ThemeMode = 'light' | 'dark' | 'system';

interface NotesPageProps {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export const NotesPage: React.FC<NotesPageProps> = ({ mode, setMode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const selectedNoteId = useSelector((state: RootState) => state.notes.selectedNoteId);
  const selectedNote = notes.find((n) => n.id === selectedNoteId) || null;
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const dragging = useRef(false);

  // Encryption state
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showPasswordManagement, setShowPasswordManagement] = useState(false);
  const [passwordMode, setPasswordMode] = useState<'setup' | 'unlock'>('setup');
  const [encryptionLoading, setEncryptionLoading] = useState(false);
  const [encryptionError, setEncryptionError] = useState<string | null>(null);
  const [managementError, setManagementError] = useState<string | null>(null);

  // Check encryption status and load notes
  useEffect(() => {
    const initializeApp = async () => {
      const encrypted = await encryptedNotesDb.isEncrypted();
      setIsEncrypted(encrypted);

      if (encrypted) {
        // Show unlock dialog immediately if encrypted
        setIsLocked(true);
        setPasswordMode('unlock');
        setShowPasswordDialog(true);
      } else {
        // Load unencrypted notes
        const dbNotes = await notesDb.getAllNotes();
        dispatch(setNotes(dbNotes));
      }
    };

    initializeApp();
  }, [dispatch]);

  // Persist notes to DB on change
  useEffect(() => {
    if (!isLocked) {
      if (isEncrypted) {
        encryptedNotesDb.saveNotes(notes);
      } else {
        notesDb.saveNotes(notes);
      }
    }
  }, [notes, isEncrypted, isLocked]);

  const handleCreate = useCallback(() => {
    dispatch(createNote({ title: '', content: '' }));
  }, [dispatch]);

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteNote(id));
    },
    [dispatch],
  );

  const handleSelect = useCallback(
    (id: string) => {
      dispatch(selectNote(id));
    },
    [dispatch],
  );

  const handleContentChange = useCallback(
    (content: string) => {
      if (selectedNote) {
        dispatch(updateNote({ id: selectedNote.id, title: selectedNote.title, content }));
      }
    },
    [dispatch, selectedNote],
  );

  const handleDragHandleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      dragging.current = true;
      const startX = e.clientX;
      const startWidth = sidebarWidth;
      const onMouseMove = (moveEvent: MouseEvent) => {
        if (!dragging.current) return;
        const newWidth = Math.min(500, Math.max(180, startWidth + moveEvent.clientX - startX));
        setSidebarWidth(newWidth);
      };
      const onMouseUp = () => {
        dragging.current = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [sidebarWidth],
  );

  const handleUpdateTitle = useCallback(
    (id: string, title: string) => {
      if (selectedNote) {
        dispatch(updateNote({ id: selectedNote.id, title, content: selectedNote.content }));
      }
    },
    [dispatch, selectedNote],
  );

  // Password setup for new encryption
  const handlePasswordSetup = () => {
    setPasswordMode('setup');
    setShowPasswordDialog(true);
    setEncryptionError(null);
  };

  // Password management for existing encryption
  const handlePasswordManagement = () => {
    setShowPasswordManagement(true);
    setManagementError(null);
  };

  // Handle password setup/unlock
  const handlePasswordSubmit = async (password: string) => {
    setEncryptionLoading(true);
    setEncryptionError(null);

    try {
      if (passwordMode === 'setup') {
        // Setup encryption with current notes
        await encryptedNotesDb.setupEncryption(password, notes);
        setIsEncrypted(true);
        setIsLocked(false);
        setShowPasswordDialog(false);
      } else {
        // Unlock existing encryption
        const success = await encryptedNotesDb.unlock(password);
        if (success) {
          const encryptedNotes = await encryptedNotesDb.getAllNotes();
          dispatch(setNotes(encryptedNotes));
          setIsLocked(false);
          setShowPasswordDialog(false);
        } else {
          setEncryptionError('Invalid password. Please try again.');
        }
      }
    } catch (error) {
      setEncryptionError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setEncryptionLoading(false);
    }
  };

  // Handle password change
  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    setEncryptionLoading(true);
    setManagementError(null);

    try {
      await encryptedNotesDb.changePassword(currentPassword, newPassword);
      setShowPasswordManagement(false);
    } catch (error) {
      setManagementError(error instanceof Error ? error.message : 'Failed to change password');
    } finally {
      setEncryptionLoading(false);
    }
  };

  // Handle password removal
  const handleRemovePassword = async (currentPassword: string) => {
    setEncryptionLoading(true);
    setManagementError(null);

    try {
      const plainNotes = await encryptedNotesDb.removeEncryption(currentPassword);
      dispatch(setNotes(plainNotes));
      setIsEncrypted(false);
      setIsLocked(false);
      setShowPasswordManagement(false);
    } catch (error) {
      setManagementError(error instanceof Error ? error.message : 'Failed to remove password');
    } finally {
      setEncryptionLoading(false);
    }
  };

  return (
    <Layout>
      <Sidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelect={handleSelect}
        onCreate={handleCreate}
        onDelete={handleDelete}
        width={sidebarWidth}
        onDragHandleMouseDown={handleDragHandleMouseDown}
        mode={mode}
        setMode={setMode}
        onUpdateTitle={handleUpdateTitle}
        isEncrypted={isEncrypted}
        onPasswordSetup={handlePasswordSetup}
        onPasswordManagement={handlePasswordManagement}
      />
      <MainArea>
        {isLocked ? (
          <EmptyState>
            <Typography variant='h6' gutterBottom>
              Notes are Locked 🔒
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Please enter your password to unlock your encrypted notes.
            </Typography>
          </EmptyState>
        ) : selectedNote ? (
          <>
            <EditorColumn>
              <NoteEditor value={selectedNote.content} onChange={handleContentChange} themeMode={mode} />
            </EditorColumn>
            <NoteViewer value={selectedNote.content} />
          </>
        ) : (
          <EmptyState>
            <Typography variant='body1' gutterBottom>
              Select or create a note to get started.
            </Typography>
          </EmptyState>
        )}
      </MainArea>

      {/* Password Setup/Unlock Dialog */}
      <PasswordSetup
        open={showPasswordDialog}
        onClose={() => !isLocked && setShowPasswordDialog(false)}
        onSetupComplete={handlePasswordSubmit}
        mode={passwordMode}
        loading={encryptionLoading}
        error={encryptionError || undefined}
      />

      {/* Password Management Dialog */}
      <PasswordManagement
        open={showPasswordManagement}
        onClose={() => setShowPasswordManagement(false)}
        onChangePassword={handleChangePassword}
        onRemovePassword={handleRemovePassword}
        loading={encryptionLoading}
        error={managementError || undefined}
      />
    </Layout>
  );
};
