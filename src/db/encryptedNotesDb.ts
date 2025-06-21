import localforage from 'localforage';
import type { Note } from '../store/notesSlice.types';
import type { NotesDb, ExportData } from './notesDb.types';
import { NoteEncryption, type EncryptedData } from '../utils/encryption';

const ENCRYPTED_NOTES_KEY = 'encrypted_notes';
const ENCRYPTION_METADATA_KEY = 'encryption_metadata';

interface EncryptionMetadata {
  isEncrypted: boolean;
  version: number;
  createdAt: string;
}

export class EncryptedNotesDb implements NotesDb {
  private password: string | null = null;
  private isUnlocked: boolean = false;

  /**
   * Checks if the database is encrypted
   */
  async isEncrypted(): Promise<boolean> {
    const metadata = await localforage.getItem<EncryptionMetadata>(ENCRYPTION_METADATA_KEY);
    return metadata?.isEncrypted ?? false;
  }

  /**
   * Sets up encryption with a password
   */
  async setupEncryption(password: string, existingNotes: Note[] = []): Promise<void> {
    // Encrypt existing notes
    const notesJson = JSON.stringify(existingNotes);
    const encryptedData = NoteEncryption.encrypt(notesJson, password);

    // Store encrypted data
    await localforage.setItem(ENCRYPTED_NOTES_KEY, encryptedData);

    // Store metadata
    const metadata: EncryptionMetadata = {
      isEncrypted: true,
      version: 1,
      createdAt: new Date().toISOString(),
    };
    await localforage.setItem(ENCRYPTION_METADATA_KEY, metadata);

    // Clear any unencrypted data
    await localforage.removeItem('notes');

    this.password = password;
    this.isUnlocked = true;
  }

  /**
   * Unlocks the database with password
   */
  async unlock(password: string): Promise<boolean> {
    if (!(await this.isEncrypted())) {
      throw new Error('Database is not encrypted');
    }

    const encryptedData = await localforage.getItem<EncryptedData>(ENCRYPTED_NOTES_KEY);
    if (!encryptedData) {
      throw new Error('No encrypted data found');
    }

    try {
      // Validate password by attempting decryption
      NoteEncryption.decrypt(encryptedData, password);
      this.password = password;
      this.isUnlocked = true;
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Locks the database (clears password from memory)
   */
  lock(): void {
    this.password = null;
    this.isUnlocked = false;
  }

  /**
   * Changes the encryption password
   */
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    if (!this.isUnlocked || this.password !== oldPassword) {
      throw new Error('Invalid current password');
    }

    // Get current notes
    const notes = await this.getAllNotes();

    // Re-encrypt with new password
    const notesJson = JSON.stringify(notes);
    const encryptedData = NoteEncryption.encrypt(notesJson, newPassword);

    // Store with new encryption
    await localforage.setItem(ENCRYPTED_NOTES_KEY, encryptedData);

    this.password = newPassword;
  }

  /**
   * Removes encryption (converts back to plain text)
   */
  async removeEncryption(password: string): Promise<Note[]> {
    if (!(await this.isEncrypted())) {
      throw new Error('Database is not encrypted');
    }

    // Unlock and get all notes
    if (!(await this.unlock(password))) {
      throw new Error('Invalid password');
    }

    const notes = await this.getAllNotes();

    // Store as plain text
    await localforage.setItem('notes', notes);

    // Remove encrypted data
    await localforage.removeItem(ENCRYPTED_NOTES_KEY);
    await localforage.removeItem(ENCRYPTION_METADATA_KEY);

    this.lock();
    return notes;
  }

  private ensureUnlocked(): void {
    if (!this.isUnlocked || !this.password) {
      throw new Error('Database is locked. Please unlock with password first.');
    }
  }

  private async getDecryptedNotes(): Promise<Note[]> {
    this.ensureUnlocked();

    const encryptedData = await localforage.getItem<EncryptedData>(ENCRYPTED_NOTES_KEY);
    if (!encryptedData) {
      return [];
    }

    const decryptedJson = NoteEncryption.decrypt(encryptedData, this.password!);
    return JSON.parse(decryptedJson) as Note[];
  }

  private async saveEncryptedNotes(notes: Note[]): Promise<void> {
    this.ensureUnlocked();

    const notesJson = JSON.stringify(notes);
    const encryptedData = NoteEncryption.encrypt(notesJson, this.password!);

    await localforage.setItem(ENCRYPTED_NOTES_KEY, encryptedData);
  }

  // Implement NotesDb interface
  async getAllNotes(): Promise<Note[]> {
    if (!(await this.isEncrypted())) {
      // Fallback to unencrypted storage
      const notes = await localforage.getItem<Note[]>('notes');
      return notes || [];
    }

    return this.getDecryptedNotes();
  }

  async saveNotes(notes: Note[]): Promise<void> {
    if (!(await this.isEncrypted())) {
      // Fallback to unencrypted storage
      await localforage.setItem('notes', notes);
      return;
    }

    await this.saveEncryptedNotes(notes);
  }

  async exportData(): Promise<ExportData> {
    const notes = await this.getAllNotes();
    return {
      version: 1,
      notes,
      exportDate: new Date().toISOString(),
      encrypted: await this.isEncrypted(),
    };
  }

  async importData(data: ExportData): Promise<void> {
    // Import as encrypted if current db is encrypted
    if (await this.isEncrypted()) {
      this.ensureUnlocked();
      await this.saveEncryptedNotes(data.notes);
    } else {
      await localforage.setItem('notes', data.notes);
    }
  }

  async migrateData(notes: Note[], _fromVersion?: number): Promise<Note[]> {
    // No migration needed for encryption
    return notes;
  }

  async validateData(data: unknown): Promise<boolean> {
    if (!data || typeof data !== 'object') return false;

    const exportData = data as ExportData;
    if (!Array.isArray(exportData.notes)) return false;
    if (typeof exportData.version !== 'number') return false;
    if (!exportData.exportDate) return false;

    return exportData.notes.every(
      (note) =>
        typeof note.id === 'string' &&
        typeof note.title === 'string' &&
        typeof note.content === 'string' &&
        typeof note.updatedAt === 'number',
    );
  }
}

// Export singleton instance
export const encryptedNotesDb = new EncryptedNotesDb();
