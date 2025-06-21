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
import { Lock, Eye, EyeSlash } from 'phosphor-react';

// Modern styled components
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
  padding: theme.spacing(3),
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
  padding: theme.spacing(1.5, 3),
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

interface PasswordSetupProps {
  open: boolean;
  onClose: () => void;
  onSetupComplete: (password: string, currentPassword?: string) => void;
  mode: 'setup' | 'unlock' | 'change';
  loading?: boolean;
  error?: string;
}

export const PasswordSetup: React.FC<PasswordSetupProps> = ({
  open,
  onClose,
  onSetupComplete,
  mode,
  loading = false,
  error,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isSetupMode = mode === 'setup';
  const isChangeMode = mode === 'change';
  const isUnlockMode = mode === 'unlock';

  const passwordsMatch = password === confirmPassword;
  const isValidPassword = password.length >= 8;

  let canSubmit = false;
  if (isUnlockMode) {
    canSubmit = password.length > 0;
  } else if (isSetupMode) {
    canSubmit = isValidPassword && passwordsMatch && confirmPassword.length > 0;
  } else if (isChangeMode) {
    canSubmit = currentPassword.length > 0 && isValidPassword && passwordsMatch && confirmPassword.length > 0;
  }

  const handleSubmit = () => {
    if (canSubmit) {
      if (isChangeMode) {
        onSetupComplete(password, currentPassword);
      } else {
        onSetupComplete(password);
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

  const passwordStrength = getPasswordStrength(password);

  const reset = () => {
    setCurrentPassword('');
    setPassword('');
    setConfirmPassword('');
    setShowCurrentPassword(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  React.useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  const getDialogTitle = () => {
    if (isSetupMode) return 'Set Up Encryption';
    if (isChangeMode) return 'Change Password';
    return 'Unlock Notes';
  };

  const getSubmitButtonText = () => {
    if (isSetupMode) return 'Set Up Encryption';
    if (isChangeMode) return 'Change Password';
    return 'Unlock';
  };

  return (
    <ModernDialog open={open} onClose={onClose} maxWidth='sm' fullWidth disableEscapeKeyDown={isUnlockMode}>
      <ModernDialogTitle>
        <IconContainer>
          <Lock size={24} />
          {getDialogTitle()}
        </IconContainer>
      </ModernDialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {isSetupMode && (
          <ModernAlert severity='info' sx={{ mb: 2 }}>
            Your notes will be encrypted and only accessible with this password.
            <strong> Make sure to remember it - it cannot be recovered!</strong>
          </ModernAlert>
        )}

        {isChangeMode && (
          <ModernAlert severity='info' sx={{ mb: 2 }}>
            Enter your current password and then set a new password for your encrypted notes.
          </ModernAlert>
        )}

        {error && (
          <ModernAlert severity='error' sx={{ mb: 2 }}>
            {error}
          </ModernAlert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {isChangeMode && (
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
          )}

          <ModernTextField
            label={isSetupMode ? 'Create Password' : isChangeMode ? 'New Password' : 'Password'}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            fullWidth
            autoFocus={!isChangeMode}
            disabled={loading}
            InputProps={{
              endAdornment: (
                <ModernButton onClick={() => setShowPassword(!showPassword)} sx={{ minWidth: 'auto', p: 1 }}>
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </ModernButton>
              ),
            }}
          />

          {(isSetupMode || isChangeMode) && (
            <>
              {password.length > 0 && (
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
                label='Confirm Password'
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

              {password.length > 0 && password.length < 8 && (
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
              {isSetupMode ? 'Setting up encryption...' : isChangeMode ? 'Changing password...' : 'Unlocking notes...'}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        {!isUnlockMode && (
          <ModernButton onClick={onClose} disabled={loading} variant='outlined'>
            Cancel
          </ModernButton>
        )}
        <ModernButton onClick={handleSubmit} variant='contained' disabled={!canSubmit || loading}>
          {getSubmitButtonText()}
        </ModernButton>
      </DialogActions>
    </ModernDialog>
  );
};
