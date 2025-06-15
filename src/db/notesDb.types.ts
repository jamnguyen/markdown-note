import type { Note } from '../store/notesSlice.types';

export interface NotesDb {
  getAllNotes(): Promise<Note[]>;
  saveNotes(notes: Note[]): Promise<void>;
}
