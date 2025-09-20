import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { Warning as WarningIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'default', // 'default', 'warning', 'error'
  loading = false,
  book = null, // Optional book object for delete confirmation
}) => {
  const theme = useTheme();

  const getTypeConfig = () => {
    switch (type) {
      case 'warning':
        return {
          color: theme.palette.warning.main,
          icon: <WarningIcon sx={{ fontSize: 48, color: theme.palette.warning.main }} />,
        };
      case 'error':
      case 'delete':
        return {
          color: theme.palette.error.main,
          icon: <DeleteIcon sx={{ fontSize: 48, color: theme.palette.error.main }} />,
        };
      default:
        return {
          color: theme.palette.primary.main,
          icon: null,
        };
    }
  };

  const config = getTypeConfig();

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog
      open={open}
      onClose={!loading ? onClose : undefined}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        {config.icon && (
          <Box sx={{ mb: 2 }}>
            {config.icon}
          </Box>
        )}
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ textAlign: 'center', px: 3 }}>
        <DialogContentText sx={{ fontSize: 16, color: 'text.primary', mb: 2 }}>
          {message}
        </DialogContentText>
        
        {book && type === 'delete' && (
          <Box
            sx={{
              p: 2,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              backgroundColor: theme.palette.grey[50],
              mt: 2,
            }}
          >
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Book Details:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
              {book.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              by {book.author} • {book.genre} • {book.publishedYear}
            </Typography>
          </Box>
        )}
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3, gap: 1, justifyContent: 'center' }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={loading}
          sx={{ minWidth: 100, borderRadius: 2 }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color={type === 'error' || type === 'delete' ? 'error' : 'primary'}
          disabled={loading}
          sx={{
            minWidth: 100,
            borderRadius: 2,
          }}
        >
          {loading ? 'Processing...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;