import React, { useCallback } from 'react';
import { Tooltip } from '@mui/material';
import { FileDownload as ExportIcon } from '@mui/icons-material';
import { TabBarContainer, TabBarActions, ExportButton, NoteTitle } from './TabBar.styled';
import { TabBarProps } from './TabBar.types';

export const TabBar: React.FC<TabBarProps> = ({ selectedNote }) => {
  const handleExport = useCallback(async () => {
    if (!selectedNote) return;

    try {
      // Use the File System Access API if available (Chrome, Edge)
      if ('showSaveFilePicker' in window) {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: `${selectedNote.title || 'Untitled'}.md`,
          types: [
            {
              description: 'Markdown files',
              accept: {
                'text/markdown': ['.md'],
              },
            },
          ],
        });

        const writable = await fileHandle.createWritable();
        await writable.write(selectedNote.content);
        await writable.close();
      } else {
        // Fallback for other browsers - download file
        const blob = new Blob([selectedNote.content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedNote.title || 'Untitled'}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      // User cancelled the save dialog or an error occurred
      console.error('Export failed:', error);
    }
  }, [selectedNote]);

  if (!selectedNote) {
    return null;
  }

  return (
    <TabBarContainer>
      <NoteTitle variant='body2'>{selectedNote.title || 'Untitled'}</NoteTitle>
      <TabBarActions>
        <Tooltip title='Export Note'>
          <ExportButton onClick={handleExport} size='small'>
            <ExportIcon fontSize='small' />
          </ExportButton>
        </Tooltip>
      </TabBarActions>
    </TabBarContainer>
  );
};
