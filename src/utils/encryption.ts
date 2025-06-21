// Encryption utilities for securing notes data
import CryptoJS from 'crypto-js';

export interface EncryptedData {
  data: string;
  salt: string;
  iv: string;
}

export class NoteEncryption {
  private static readonly ITERATIONS = 10000; // PBKDF2 iterations
  private static readonly KEY_SIZE = 256 / 32; // 256-bit key
  private static readonly IV_SIZE = 128 / 32; // 128-bit IV

  /**
   * Derives encryption key from password using PBKDF2
   */
  private static deriveKey(password: string, salt: string): CryptoJS.lib.WordArray {
    return CryptoJS.PBKDF2(password, salt, {
      keySize: this.KEY_SIZE,
      iterations: this.ITERATIONS,
      hasher: CryptoJS.algo.SHA256,
    });
  }

  /**
   * Encrypts data with password
   */
  static encrypt(data: string, password: string): EncryptedData {
    // Generate random salt and IV
    const salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    // Derive key from password
    const key = this.deriveKey(password, salt);

    // Encrypt data
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return {
      data: encrypted.toString(),
      salt: salt,
      iv: iv.toString(),
    };
  }

  /**
   * Decrypts data with password
   */
  static decrypt(encryptedData: EncryptedData, password: string): string {
    try {
      // Derive key from password and salt
      const key = this.deriveKey(password, encryptedData.salt);

      // Decrypt data
      const decrypted = CryptoJS.AES.decrypt(encryptedData.data, key, {
        iv: CryptoJS.enc.Hex.parse(encryptedData.iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      const result = decrypted.toString(CryptoJS.enc.Utf8);

      if (!result) {
        throw new Error('Decryption failed - invalid password or corrupted data');
      }

      return result;
    } catch (error) {
      throw new Error('Failed to decrypt data - check your password');
    }
  }

  /**
   * Validates if password can decrypt the data
   */
  static validatePassword(encryptedData: EncryptedData, password: string): boolean {
    try {
      this.decrypt(encryptedData, password);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Generates a secure random password
   */
  static generateSecurePassword(length: number = 32): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }
}
