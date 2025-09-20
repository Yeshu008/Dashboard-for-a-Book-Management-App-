import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Add as AddIcon, Home as HomeIcon } from '@mui/icons-material';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleHomeClick = () => {
    navigate('/');
  };


  const isHomePage = location.pathname === '/';
  
  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
            onClick={handleHomeClick}
          >
            📚 Book Management Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {!isHomePage && (
            <Button
              color="inherit"
              startIcon={!isMobile && <HomeIcon />}
              onClick={handleHomeClick}
              sx={{
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {isMobile ? <HomeIcon /> : 'Dashboard'}
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;