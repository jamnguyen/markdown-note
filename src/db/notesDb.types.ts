import type { Note } from '../store/notesSlice.types';

export interface ExportData {
  version: number;
  notes: Note[];
  exportDate: string;
  encrypted?: boolean;
}

export interface NotesDb {
  getAllNotes(): Promise<Note[]>;
  saveNotes(notes: Note[]): Promise<void>;
  exportData(): Promise<ExportData>;
  importData(data: ExportData): Promise<void>;
  migrateData(notes: Note[], fromVersion: number): Promise<Note[]>;
  validateData(data: unknown): Promise<boolean>;
}
