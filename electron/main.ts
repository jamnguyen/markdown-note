import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure auto-updater
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

let mainWindow: BrowserWindow | null = null;

// Update announcement function
function announceUpdate(type: string, info?: unknown) {
  if (mainWindow) {
    mainWindow.webContents.send('update-event', { type, info });
  }
}

function createWindow() {
  // Icon path - use absolute path from project root
  const iconPath = path.join(process.cwd(), 'src/assets/logo.png');

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Disable DevTools warnings by not opening DevTools by default
  // DevTools can still be opened manually with Cmd+Option+I

  // Data export/import handlers
  ipcMain.handle('export-data', async (_, data) => {
    const { filePath } = await dialog.showSaveDialog({
      title: 'Export Notes',
      defaultPath: 'notes-backup.json',
      filters: [{ name: 'JSON', extensions: ['json'] }],
    });

    if (filePath) {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2));
      return true;
    }
    return false;
  });

  ipcMain.handle('import-data', async () => {
    const { filePaths } = await dialog.showOpenDialog({
      title: 'Import Notes',
      filters: [{ name: 'JSON', extensions: ['json'] }],
      properties: ['openFile'],
    });

    if (filePaths.length > 0) {
      const data = await fs.readFile(filePaths[0], 'utf-8');
      return JSON.parse(data);
    }
    return null;
  });

  // Auto-updater events
  autoUpdater.on('checking-for-update', () => {
    announceUpdate('checking');
  });

  autoUpdater.on('update-not-available', (info) => {
    announceUpdate('not-available', info);
  });

  autoUpdater.on('error', (error) => {
    announceUpdate('error', error);
    dialog.showErrorBox('Error', error.message);
  });

  autoUpdater.on('update-available', (info) => {
    announceUpdate('available', info);
    dialog
      .showMessageBox({
        type: 'info',
        title: 'Update Available',
        message: `Version ${info.version} is available.\n\nWhat's new:\n${
          info.releaseNotes || 'No release notes available'
        }`,
        detail: 'Would you like to download it now?',
        buttons: ['Yes', 'No'],
        cancelId: 1,
      })
      .then((result) => {
        if (result.response === 0) {
          announceUpdate('downloading');
          autoUpdater.downloadUpdate();
        }
      });
  });

  autoUpdater.on('download-progress', (progress) => {
    announceUpdate('progress', progress);
  });

  autoUpdater.on('update-downloaded', (info) => {
    announceUpdate('ready', info);
    dialog
      .showMessageBox({
        type: 'info',
        title: 'Update Ready',
        message: `Version ${info.version} has been downloaded and is ready to install.`,
        detail: 'Would you like to install it now? The app will restart automatically.',
        buttons: ['Install', 'Later'],
        cancelId: 1,
      })
      .then((result) => {
        if (result.response === 0) {
          autoUpdater.quitAndInstall();
        }
      });
  });

  // Manual update check handler
  ipcMain.handle('check-for-updates', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Auto-update Disabled',
      message: 'Auto-update is currently disabled. Please check for updates manually.',
    });
  });

  // In development, load from Vite dev server
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    // Don't auto-open DevTools to avoid autofill warnings
    // mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built index.html
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    // Auto-update disabled - no automatic update check
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  mainWindow = null;
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
