import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { X } from 'phosphor-react';
import {
  StyledDialogTitle,
  StyledDialogContentText,
  CloseIconButton,
  DialogTitleText,
  InfoBox,
  LinkBox,
  StyledLink,
} from './AboutDialog.styled';
import type { AboutDialogProps } from './AboutDialog.types';

export const AboutDialog: React.FC<AboutDialogProps> = ({ open, onClose, appName, appVersion, author = 'Unknown' }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <StyledDialogTitle>
        <DialogTitleText variant='h5'>About {appName}</DialogTitleText>
        <CloseIconButton onClick={onClose} size='small'>
          <X size={20} />
        </CloseIconButton>
      </StyledDialogTitle>
      <DialogContent>
        <StyledDialogContentText>
          <InfoBox>
            <strong>App Name:</strong> {appName}
          </InfoBox>
          <InfoBox>
            <strong>Version:</strong> {appVersion}
          </InfoBox>
          <InfoBox>
            <strong>Author:</strong> {author}
          </InfoBox>
          <LinkBox>
            <StyledLink
              href='https://www.flaticon.com/free-icons/sticky-notes'
              title='sticky notes icons'
              target='_blank'
              rel='noopener noreferrer'>
              Sticky notes icons created by Freepik - Flaticon
            </StyledLink>
          </LinkBox>
        </StyledDialogContentText>
      </DialogContent>
    </Dialog>
  );
};
