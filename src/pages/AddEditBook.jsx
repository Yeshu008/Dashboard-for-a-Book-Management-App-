import React from 'react';
import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';
import BookForm from '../components/BookForm';

const AddEditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component="button"
          underline="hover"
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.5,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            fontSize: 'inherit',
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main',
            },
          }}
          onClick={() => handleBreadcrumbClick('/')}
        >
          <HomeIcon sx={{ fontSize: 16 }} />
          Dashboard
        </Link>
        <Typography color="text.primary">
          {isEditing ? 'Edit Book' : 'Add New Book'}
        </Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
          {isEditing ? 'Edit Book' : 'Add New Book'}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {isEditing 
            ? 'Update the book information in the form below'
            : 'Fill in the details below to add a new book to your library'
          }
        </Typography>
      </Box>

      {/* Book Form */}
      <BookForm />
    </Box>
  );
};

export default AddEditBook;