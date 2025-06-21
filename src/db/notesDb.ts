import localforage from 'localforage';
import type { Note } from '../store/notesSlice.types';
import type { NotesDb, ExportData } from './notesDb.types';

const NOTES_KEY = 'notes';
const DB_VERSION = 1; // Used for migrations

const notesDb: NotesDb = {
  async getAllNotes() {
    const notes = await localforage.getItem<Note[]>(NOTES_KEY);
    return notes || [];
  },

  async saveNotes(notes: Note[]) {
    await localforage.setItem(NOTES_KEY, notes);
  },

  async exportData(): Promise<ExportData> {
    const notes = await this.getAllNotes();
    return {
      version: DB_VERSION,
      notes,
      exportDate: new Date().toISOString(),
    };
  },

  async importData(data: ExportData): Promise<void> {
    // Version check and migration if needed
    if (data.version !== DB_VERSION) {
      data.notes = await this.migrateData(data.notes, data.version);
    }
    await this.saveNotes(data.notes);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async migrateData(notes: Note[], _fromVersion?: number): Promise<Note[]> {
    const migratedNotes = [...notes];

    // Add migration logic here when needed
    // Example:
    // if (fromVersion < 2) {
    //   migratedNotes = migratedNotes.map(note => ({
    //     ...note,
    //     newField: defaultValue,
    //   }));
    // }

    return migratedNotes;
  },

  async validateData(data: unknown): Promise<boolean> {
    if (!data || typeof data !== 'object') return false;

    const exportData = data as ExportData;
    if (!Array.isArray(exportData.notes)) return false;
    if (typeof exportData.version !== 'number') return false;
    if (!exportData.exportDate) return false;

    // Validate each note
    return exportData.notes.every(
      (note) =>
        typeof note.id === 'string' &&
        typeof note.title === 'string' &&
        typeof note.content === 'string' &&
        typeof note.updatedAt === 'number',
    );
  },
};

export default notesDb;
export * from './notesDb.types';
