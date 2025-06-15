import localforage from 'localforage';
import type { Note } from '../store/notesSlice.types';
import type { NotesDb } from './notesDb.types';

const NOTES_KEY = 'notes';

const notesDb: NotesDb = {
  async getAllNotes() {
    const notes = await localforage.getItem<Note[]>(NOTES_KEY);
    return notes || [];
  },
  async saveNotes(notes: Note[]) {
    await localforage.setItem(NOTES_KEY, notes);
  },
};

export default notesDb;
export * from './notesDb.types';
