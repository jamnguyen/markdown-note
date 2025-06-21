import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { X } from 'phosphor-react';
import { StyledDialogTitle, StyledDialogContentText, CloseIconButton } from './ConfirmDialog.styled';
import type { ConfirmDialogProps } from './ConfirmDialog.types';

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmText = 'Confirm',
  confirmColor = 'primary',
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <StyledDialogTitle>
        <Typography>{title}</Typography>
        <CloseIconButton onClick={onCancel} size='small'>
          <X size={20} />
        </CloseIconButton>
      </StyledDialogTitle>
      <DialogContent>
        <StyledDialogContentText>{message}</StyledDialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color={confirmColor} variant='contained'>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
