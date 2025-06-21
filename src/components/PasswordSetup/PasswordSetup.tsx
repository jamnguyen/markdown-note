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
import { Lock, Eye, EyeSlash } from 'phosphor-react';

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
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth disableEscapeKeyDown={isUnlockMode}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Lock size={24} />
        {getDialogTitle()}
      </DialogTitle>

      <DialogContent>
        {isSetupMode && (
          <Alert severity='info' sx={{ mb: 2 }}>
            Your notes will be encrypted and only accessible with this password.
            <strong> Make sure to remember it - it cannot be recovered!</strong>
          </Alert>
        )}

        {isChangeMode && (
          <Alert severity='info' sx={{ mb: 2 }}>
            Enter your current password and then set a new password for your encrypted notes.
          </Alert>
        )}

        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {isChangeMode && (
            <TextField
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
                  <Button onClick={() => setShowCurrentPassword(!showCurrentPassword)} sx={{ minWidth: 'auto', p: 1 }}>
                    {showCurrentPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                  </Button>
                ),
              }}
            />
          )}

          <TextField
            label={isSetupMode ? 'Create Password' : isChangeMode ? 'New Password' : 'Password'}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            fullWidth
            autoFocus={!isChangeMode}
            disabled={loading}
            InputProps={{
              endAdornment: (
                <Button onClick={() => setShowPassword(!showPassword)} sx={{ minWidth: 'auto', p: 1 }}>
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </Button>
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
                  <LinearProgress
                    variant='determinate'
                    value={passwordStrength}
                    sx={{
                      height: 6,
                      borderRadius: 3,
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

              <TextField
                label='Confirm Password'
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
                    <Button
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      sx={{ minWidth: 'auto', p: 1 }}>
                      {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                    </Button>
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
            <LinearProgress />
            <Typography variant='caption' color='text.secondary' sx={{ mt: 1 }}>
              {isSetupMode ? 'Setting up encryption...' : isChangeMode ? 'Changing password...' : 'Unlocking notes...'}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        {!isUnlockMode && (
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        )}
        <Button onClick={handleSubmit} variant='contained' disabled={!canSubmit || loading}>
          {getSubmitButtonText()}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
