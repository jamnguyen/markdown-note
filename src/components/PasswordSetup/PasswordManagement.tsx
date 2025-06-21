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

// Modern styled components (reused from PasswordSetup)
const ModernDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[4],
    padding: 0,
    border: 'none',
  },
}));

const ModernDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  textAlign: 'left',
  borderBottom: `1px solid ${theme.palette.border}`,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.h5.fontWeight,
  fontSize: theme.typography.h5.fontSize,
  letterSpacing: theme.typography.h5.letterSpacing,
}));

const ModernAlert = styled(Alert)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  fontFamily: theme.typography.fontFamily,
  border: 'none',
  '&.MuiAlert-standardInfo': {
    backgroundColor: theme.palette.retro.blue,
    color: theme.palette.text.primary,
  },
  '&.MuiAlert-standardError': {
    backgroundColor: theme.palette.error.light || theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

const ModernTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1.5),
    fontFamily: theme.typography.fontFamily,
    border: `1px solid ${theme.palette.border}`,
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.subtitle1.fontWeight,
    color: theme.palette.text.secondary,
  },
  '& .MuiFormHelperText-root': {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.caption.fontSize,
  },
}));

const ModernButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1, 2),
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.button.fontWeight,
  fontSize: theme.typography.button.fontSize,
  letterSpacing: theme.typography.button.letterSpacing,
  textTransform: theme.typography.button.textTransform,
  boxShadow: 'none',
  border: 'none',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[2],
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: theme.shadows[1],
  },
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark || theme.palette.primary.main,
    },
  },
  '&.MuiButton-outlined': {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.border}`,
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ModernProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: theme.spacing(1),
  borderRadius: theme.spacing(0.5),
  backgroundColor: theme.palette.retro.beige,
  '& .MuiLinearProgress-bar': {
    borderRadius: theme.spacing(0.5),
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
    <ModernDialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <ModernDialogTitle>
        <IconContainer>
          <Lock size={24} />
          Password Management
        </IconContainer>
      </ModernDialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <ModernAlert severity='info' sx={{ mb: 2 }}>
          {mode === 'change'
            ? 'Enter your current password and set a new password for your encrypted notes.'
            : 'Enter your current password to remove encryption. Your notes will be stored in plain text.'}
        </ModernAlert>

        {error && (
          <ModernAlert severity='error' sx={{ mb: 2 }}>
            {error}
          </ModernAlert>
        )}

        <ModeToggleContainer>
          <ModernButton
            variant={mode === 'change' ? 'contained' : 'outlined'}
            onClick={() => setMode('change')}
            disabled={loading}
            size='small'>
            Change Password
          </ModernButton>
          <ModernButton
            variant={mode === 'remove' ? 'contained' : 'outlined'}
            color='error'
            onClick={() => setMode('remove')}
            disabled={loading}
            size='small'
            startIcon={<Trash size={16} />}>
            Remove Password
          </ModernButton>
        </ModeToggleContainer>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <ModernTextField
            label='Current Password'
            type={showCurrentPassword ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            fullWidth
            autoFocus
            disabled={loading}
            InputProps={{
              endAdornment: (
                <ModernButton
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  sx={{ minWidth: 'auto', p: 1 }}>
                  {showCurrentPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </ModernButton>
              ),
            }}
          />

          {mode === 'change' && (
            <>
              <ModernTextField
                label='New Password'
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                fullWidth
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <ModernButton onClick={() => setShowNewPassword(!showNewPassword)} sx={{ minWidth: 'auto', p: 1 }}>
                      {showNewPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                    </ModernButton>
                  ),
                }}
              />

              {newPassword.length > 0 && (
                <Box>
                  <Typography variant='caption' color='text.secondary'>
                    Password Strength
                  </Typography>
                  <ModernProgressBar
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

              <ModernTextField
                label='Confirm New Password'
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                fullWidth
                disabled={loading}
                error={confirmPassword.length > 0 && !passwordsMatch}
                helperText={confirmPassword.length > 0 && !passwordsMatch ? 'Passwords do not match' : ''}
                InputProps={{
                  endAdornment: (
                    <ModernButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      sx={{ minWidth: 'auto', p: 1 }}>
                      {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                    </ModernButton>
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
            <ModernProgressBar />
            <Typography variant='caption' color='text.secondary' sx={{ mt: 1 }}>
              {mode === 'change' ? 'Changing password...' : 'Removing encryption...'}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 0 }}>
        <ModernButton onClick={onClose} disabled={loading} variant='outlined'>
          Cancel
        </ModernButton>
        <ModernButton
          onClick={handleSubmit}
          variant='contained'
          disabled={!canSubmit || loading}
          color={mode === 'remove' ? 'error' : 'primary'}>
          {mode === 'change' ? 'Change Password' : 'Remove Password'}
        </ModernButton>
      </DialogActions>
    </ModernDialog>
  );
};
