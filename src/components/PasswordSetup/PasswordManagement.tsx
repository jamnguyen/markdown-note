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
import { Lock, Eye, EyeSlash, Trash } from 'phosphor-react';

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
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Lock size={24} />
        Password Management
      </DialogTitle>

      <DialogContent>
        <Alert severity='info' sx={{ mb: 2 }}>
          {mode === 'change'
            ? 'Enter your current password and set a new password for your encrypted notes.'
            : 'Enter your current password to remove encryption. Your notes will be stored in plain text.'}
        </Alert>

        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Button
            variant={mode === 'change' ? 'contained' : 'outlined'}
            onClick={() => setMode('change')}
            disabled={loading}
            size='small'>
            Change Password
          </Button>
          <Button
            variant={mode === 'remove' ? 'contained' : 'outlined'}
            color='error'
            onClick={() => setMode('remove')}
            disabled={loading}
            size='small'
            startIcon={<Trash size={16} />}>
            Remove Password
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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

          {mode === 'change' && (
            <>
              <TextField
                label='New Password'
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                fullWidth
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <Button onClick={() => setShowNewPassword(!showNewPassword)} sx={{ minWidth: 'auto', p: 1 }}>
                      {showNewPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                    </Button>
                  ),
                }}
              />

              {newPassword.length > 0 && (
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
                    <Button
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      sx={{ minWidth: 'auto', p: 1 }}>
                      {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                    </Button>
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
            <LinearProgress />
            <Typography variant='caption' color='text.secondary' sx={{ mt: 1 }}>
              {mode === 'change' ? 'Changing password...' : 'Removing encryption...'}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant='contained'
          disabled={!canSubmit || loading}
          color={mode === 'remove' ? 'error' : 'primary'}>
          {mode === 'change' ? 'Change Password' : 'Remove Password'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
