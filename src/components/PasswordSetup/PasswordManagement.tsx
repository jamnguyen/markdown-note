import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Lock, Eye, EyeSlash, Trash } from 'phosphor-react';

// Retro styled components (reused from PasswordSetup)
const RetroDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.background.paper,
    border: `${theme.spacing(1)}px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2),
  },
}));

const RetroDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  margin: theme.spacing(-2, -2, 2, -2),
  padding: theme.spacing(3),
  textAlign: 'center',
  borderRadius: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.h4.fontWeight,
  fontSize: theme.typography.h4.fontSize,
  letterSpacing: theme.typography.h4.letterSpacing,
  textTransform: theme.typography.h4.textTransform,
}));

const RetroAlert = styled(Alert)(({ theme }) => ({
  border: `${theme.spacing(0.5)}px solid`,
  borderRadius: theme.spacing(1),
  fontFamily: theme.typography.fontFamily,
  '&.MuiAlert-standardInfo': {
    backgroundColor: theme.palette.retro.cream,
    borderColor: theme.palette.info.main,
    color: theme.palette.text.primary,
  },
  '&.MuiAlert-standardError': {
    backgroundColor: theme.palette.retro.pink,
    borderColor: theme.palette.error.main,
    color: theme.palette.primary.contrastText,
  },
}));

const RetroTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.background.default,
    border: `${theme.spacing(0.5)}px solid ${theme.palette.border}`,
    borderRadius: theme.spacing(1),
    fontFamily: theme.typography.fontFamily,
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 ${theme.spacing(0.5)}px ${theme.palette.primary.main}40`,
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.subtitle1.fontWeight,
    letterSpacing: theme.typography.subtitle1.letterSpacing,
  },
  '& .MuiFormHelperText-root': {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.caption.fontSize,
  },
}));

const RetroButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2, 4),
  border: `${theme.spacing(0.5)}px solid`,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.button.fontWeight,
  fontSize: theme.typography.button.fontSize,
  letterSpacing: theme.typography.button.letterSpacing,
  textTransform: theme.typography.button.textTransform,
  boxShadow: theme.shadows[1],
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translate(-1px, -1px)',
    boxShadow: theme.shadows[2],
  },
  '&:active': {
    transform: 'translate(0, 0)',
    boxShadow: theme.shadows[1],
  },
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark || theme.palette.primary.main,
    },
  },
  '&.MuiButton-outlined': {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.text.secondary,
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const RetroProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: theme.spacing(2),
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
  '& .MuiLinearProgress-bar': {
    borderRadius: theme.spacing(1),
  },
}));

const IconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const ModeToggleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

interface PasswordManagementProps {
  open: boolean;
  onClose: () => void;
  onChangePassword: (currentPassword: string, newPassword: string) => void;
  onRemovePassword: (currentPassword: string) => void;
  loading?: boolean;
  error?: string;
}

export const PasswordManagement: React.FC<PasswordManagementProps> = ({
  open,
  onClose,
  onChangePassword,
  onRemovePassword,
  loading = false,
  error,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mode, setMode] = useState<'change' | 'remove'>('change');

  const passwordsMatch = newPassword === confirmPassword;
  const isValidNewPassword = newPassword.length >= 8;

  const canSubmit =
    mode === 'remove'
      ? currentPassword.length > 0
      : currentPassword.length > 0 && isValidNewPassword && passwordsMatch && confirmPassword.length > 0;

  const handleSubmit = () => {
    if (canSubmit) {
      if (mode === 'remove') {
        onRemovePassword(currentPassword);
      } else {
        onChangePassword(currentPassword, newPassword);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && canSubmit) {
      handleSubmit();
    }
  };

  const getPasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength += 25;
    if (pwd.length >= 12) strength += 25;
    if (/[A-Z]/.test(pwd)) strength += 25;
    if (/[0-9]/.test(pwd)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const reset = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setMode('change');
  };

  React.useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  return (
    <RetroDialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <RetroDialogTitle>
        <IconContainer>
          <Lock size={24} />
          Password Management
        </IconContainer>
      </RetroDialogTitle>

      <DialogContent>
        <RetroAlert severity='info' sx={{ mb: 2 }}>
          {mode === 'change'
            ? 'Enter your current password and set a new password for your encrypted notes.'
            : 'Enter your current password to remove encryption. Your notes will be stored in plain text.'}
        </RetroAlert>

        {error && (
          <RetroAlert severity='error' sx={{ mb: 2 }}>
            {error}
          </RetroAlert>
        )}

        <ModeToggleContainer>
          <RetroButton
            variant={mode === 'change' ? 'contained' : 'outlined'}
            onClick={() => setMode('change')}
            disabled={loading}
            size='small'>
            Change Password
          </RetroButton>
          <RetroButton
            variant={mode === 'remove' ? 'contained' : 'outlined'}
            color='error'
            onClick={() => setMode('remove')}
            disabled={loading}
            size='small'
            startIcon={<Trash size={16} />}>
            Remove Password
          </RetroButton>
        </ModeToggleContainer>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <RetroTextField
            label='Current Password'
            type={showCurrentPassword ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            fullWidth
            autoFocus
            disabled={loading}
            InputProps={{
              endAdornment: (
                <RetroButton
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  sx={{ minWidth: 'auto', p: 1 }}>
                  {showCurrentPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </RetroButton>
              ),
            }}
          />

          {mode === 'change' && (
            <>
              <RetroTextField
                label='New Password'
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                fullWidth
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <RetroButton onClick={() => setShowNewPassword(!showNewPassword)} sx={{ minWidth: 'auto', p: 1 }}>
                      {showNewPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                    </RetroButton>
                  ),
                }}
              />

              {newPassword.length > 0 && (
                <Box>
                  <Typography variant='caption' color='text.secondary'>
                    Password Strength
                  </Typography>
                  <RetroProgressBar
                    variant='determinate'
                    value={passwordStrength}
                    sx={{
                      '& .MuiLinearProgress-bar': {
                        backgroundColor:
                          passwordStrength < 50
                            ? 'error.main'
                            : passwordStrength < 75
                              ? 'warning.main'
                              : 'success.main',
                      },
                    }}
                  />
                  <Typography variant='caption' color='text.secondary'>
                    {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Medium' : 'Strong'}
                  </Typography>
                </Box>
              )}

              <RetroTextField
                label='Confirm New Password'
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                fullWidth
                disabled={loading}
                error={confirmPassword.length > 0 && !passwordsMatch}
                helperText={confirmPassword.length > 0 && !passwordsMatch ? 'Passwords do not match' : ''}
                InputProps={{
                  endAdornment: (
                    <RetroButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      sx={{ minWidth: 'auto', p: 1 }}>
                      {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                    </RetroButton>
                  ),
                }}
              />

              {newPassword.length > 0 && newPassword.length < 8 && (
                <Typography variant='caption' color='error'>
                  Password must be at least 8 characters long
                </Typography>
              )}
            </>
          )}
        </Box>

        {loading && (
          <Box sx={{ mt: 2 }}>
            <RetroProgressBar />
            <Typography variant='caption' color='text.secondary' sx={{ mt: 1 }}>
              {mode === 'change' ? 'Changing password...' : 'Removing encryption...'}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <RetroButton onClick={onClose} disabled={loading} variant='outlined'>
          Cancel
        </RetroButton>
        <RetroButton
          onClick={handleSubmit}
          variant='contained'
          disabled={!canSubmit || loading}
          color={mode === 'remove' ? 'error' : 'primary'}>
          {mode === 'change' ? 'Change Password' : 'Remove Password'}
        </RetroButton>
      </DialogActions>
    </RetroDialog>
  );
};
