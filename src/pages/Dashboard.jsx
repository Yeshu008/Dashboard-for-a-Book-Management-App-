import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import BookStats from '../components/BookStats';
import BookFilters from '../components/BookFilters';
import BookTable from '../components/BookTable';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAddBook = () => {
    navigate('/add');
  };

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        flexWrap: 'wrap',
        gap: 2,
      }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
            Library Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage your book collection with ease
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddBook}
          sx={{ 
            borderRadius: 2,
            px: 3,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 500,
          }}
        >
          Add New Book
        </Button>
      </Box>

      {/* Statistics Cards */}
      <BookStats />

      {/* Filters */}
      <BookFilters />

      {/* Books Table */}
      <BookTable />
    </Box>
  );
};

export default Dashboard;