import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { useBook, useCreateBook, useUpdateBook } from '../hooks/useBooks';
import { FormSkeleton } from './LoadingSkeleton';


const validationSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(1, 'Title must be at least 1 character')
    .max(200, 'Title must be less than 200 characters'),
  author: yup
    .string()
    .required('Author is required')
    .min(2, 'Author name must be at least 2 characters')
    .max(100, 'Author name must be less than 100 characters'),
  genre: yup
    .string()
    .required('Genre is required'),
  publishedYear: yup
    .number()
    .required('Published year is required')
    .min(1000, 'Please enter a valid year')
    .max(new Date().getFullYear(), `Year cannot be later than ${new Date().getFullYear()}`),
  status: yup
    .string()
    .required('Status is required')
    .oneOf(['Available', 'Issued'], 'Status must be either Available or Issued'),
});


const genreOptions = [
  'Fiction',
  'Non-Fiction',
  'Mystery',
  'Romance',
  'Science Fiction',
  'Fantasy',
  'Biography',
  'History',
  'Self-Help',
  'Business',
  'Technology',
  'Health',
  'Travel',
  'Cookbooks',
  'Art',
  'Religion',
  'Philosophy',
  'Poetry',
  'Drama',
  'Children',
  'Young Adult',
  'Classic Literature',
  'Thriller',
  'Horror',
  'Adventure',
  'Comedy',
  'Crime',
  'Dystopian Fiction',
  'Coming-of-age',
  'Other',
].sort();


const statusOptions = ['Available', 'Issued'];

const BookForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const { data: book, isLoading: isLoadingBook, error: bookError } = useBook(id);
  const createBookMutation = useCreateBook();
  const updateBookMutation = useUpdateBook();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      publishedYear: new Date().getFullYear(),
      status: 'Available',
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    if (isEditing && book) {
      reset({
        title: book.title || '',
        author: book.author || '',
        genre: book.genre || '',
        publishedYear: book.publishedYear || new Date().getFullYear(),
        status: book.status || 'Available',
      });
    }
  }, [book, isEditing, reset]);

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await updateBookMutation.mutateAsync({ id, data });
        navigate('/');
      } else {
        await createBookMutation.mutateAsync(data);
        navigate('/');
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };


  if (isEditing && isLoadingBook) {
    return <FormSkeleton />;
  }

  // Error state
  if (isEditing && bookError) {
    return (
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to load book details. Please try again.
          </Alert>
          <Button variant="outlined" onClick={handleCancel}>
            Go Back
          </Button>
        </CardContent>
      </Card>
    );
  }

  const isLoading = createBookMutation.isPending || updateBookMutation.isPending;

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto' }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
          {isEditing ? 'Edit Book' : 'Add New Book'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Book Title"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    disabled={isLoading}
                    variant="outlined"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                )}
              />
            </Grid>

            {/* Author */}
            <Grid item xs={12} md={6}>
              <Controller
                name="author"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Author"
                    error={!!errors.author}
                    helperText={errors.author?.message}
                    disabled={isLoading}
                    variant="outlined"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                )}
              />
            </Grid>

            {/* Genre */}
            <Grid item xs={12} md={6}>
              <Controller
                name="genre"
                control={control}
                render={({ field }) => (
                  <FormControl 
                    fullWidth 
                    error={!!errors.genre}
                    disabled={isLoading}
                  >
                    <InputLabel>Genre</InputLabel>
                    <Select
                      {...field}
                      label="Genre"
                      sx={{ borderRadius: 2 }}
                    >
                      {genreOptions.map((genre) => (
                        <MenuItem key={genre} value={genre}>
                          {genre}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.genre && (
                      <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                        {errors.genre.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Published Year */}
            <Grid item xs={12} md={6}>
              <Controller
                name="publishedYear"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Published Year"
                    type="number"
                    error={!!errors.publishedYear}
                    helperText={errors.publishedYear?.message}
                    disabled={isLoading}
                    variant="outlined"
                    inputProps={{ min: 1000, max: new Date().getFullYear() }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                )}
              />
            </Grid>

            {/* Status */}
            <Grid item xs={12} md={6}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl 
                    fullWidth 
                    error={!!errors.status}
                    disabled={isLoading}
                  >
                    <InputLabel>Status</InputLabel>
                    <Select
                      {...field}
                      label="Status"
                      sx={{ borderRadius: 2 }}
                    >
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.status && (
                      <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
                        {errors.status.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              disabled={isLoading}
              startIcon={<CancelIcon />}
              sx={{ borderRadius: 2, minWidth: 120 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : <SaveIcon />}
              sx={{ borderRadius: 2, minWidth: 120 }}
            >
              {isLoading ? 'Saving...' : isEditing ? 'Update Book' : 'Add Book'}
            </Button>
          </Box>
        </Box>

        {/* Development Debug Info (remove in production) */}
        {process.env.NODE_ENV === 'development' && (
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="caption" display="block">
              Debug Info (Development Only):
            </Typography>
            <pre style={{ fontSize: '10px', margin: 0 }}>
              {JSON.stringify(watchedValues, null, 2)}
            </pre>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default BookForm;