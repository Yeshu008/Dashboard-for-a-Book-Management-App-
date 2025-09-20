import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Box,
  InputAdornment,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useBookContext } from '../contexts/BookContext';
import { useBooks } from '../hooks/useBooks';
import { FiltersSkeleton } from './LoadingSkeleton';

const BookFilters = () => {
  const { state, actions } = useBookContext();
  const { data: books = [], isLoading } = useBooks();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [searchInput, setSearchInput] = useState(state.filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      actions.setSearch(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, actions]);

  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(books.map(book => book.genre))];
    return uniqueGenres.sort();
  }, [books]);

  const statusOptions = ['Available', 'Issued'];

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleGenreChange = (event) => {
    actions.setGenreFilter(event.target.value);
  };

  const handleStatusChange = (event) => {
    actions.setStatusFilter(event.target.value);
  };

  const handleClearFilters = () => {
    setSearchInput('');
    actions.resetFilters();
  };

  const hasActiveFilters = state.filters.search || state.filters.genre || state.filters.status;

  if (isLoading) {
    return <FiltersSkeleton />;
  }

  return (
    <Card sx={{ mb: 3 }}>
      <Box sx={{ p: 2.5 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Search Field */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by title or author..."
              value={searchInput}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchInput && (
                  <InputAdornment position="end">
                    <Button
                      size="small"
                      onClick={() => setSearchInput('')}
                      sx={{ minWidth: 'auto', p: 0.5 }}
                    >
                      <ClearIcon fontSize="small" />
                    </Button>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>

          {/* Genre Filter */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Genre</InputLabel>
              <Select
                value={state.filters.genre}
                onChange={handleGenreChange}
                label="Genre"
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="">
                  <em>All Genres</em>
                </MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Status Filter */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={state.filters.status}
                onChange={handleStatusChange}
                label="Status"
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="">
                  <em>All Status</em>
                </MenuItem>
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Clear Filters Button */}
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={!isMobile && <ClearIcon />}
              onClick={handleClearFilters}
              disabled={!hasActiveFilters}
              sx={{
                height: 56,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              {isMobile ? 'Clear' : 'Clear Filters'}
            </Button>
          </Grid>
        </Grid>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <FilterIcon color="action" fontSize="small" />
            {state.filters.search && (
              <Chip
                label={`Search: "${state.filters.search}"`}
                onDelete={() => {
                  setSearchInput('');
                  actions.setSearch('');
                }}
                size="small"
                variant="outlined"
              />
            )}
            {state.filters.genre && (
              <Chip
                label={`Genre: ${state.filters.genre}`}
                onDelete={() => actions.setGenreFilter('')}
                size="small"
                variant="outlined"
              />
            )}
            {state.filters.status && (
              <Chip
                label={`Status: ${state.filters.status}`}
                onDelete={() => actions.setStatusFilter('')}
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default BookFilters;