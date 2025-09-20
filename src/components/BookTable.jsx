import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Typography,
  Box,
  TableSortLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useBookContext } from '../contexts/BookContext';
import { useBooks, useDeleteBook } from '../hooks/useBooks';
import { BookTableSkeleton } from './LoadingSkeleton';
import ConfirmDialog from './ConfirmDialog';

const BookTable = () => {
  const { state, actions } = useBookContext();
  const { data: books = [], isLoading, error } = useBooks();
  const deleteBookMutation = useDeleteBook();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

 
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    book: null,
  });

  
  const [orderBy, setOrderBy] = useState('title');
  const [order, setOrder] = useState('asc');

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books;

 
    if (state.filters.search) {
      const searchTerm = state.filters.search.toLowerCase();
      filtered = filtered.filter(
        book =>
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm)
      );
    }

 
    if (state.filters.genre) {
      filtered = filtered.filter(book => book.genre === state.filters.genre);
    }

    if (state.filters.status) {
      filtered = filtered.filter(book => book.status === state.filters.status);
    }

    filtered.sort((a, b) => {
      let aValue = a[orderBy];
      let bValue = b[orderBy];

      if (orderBy === 'publishedYear') {
        aValue = parseInt(aValue) || 0;
        bValue = parseInt(bValue) || 0;
      } else {
        aValue = aValue?.toString().toLowerCase() || '';
        bValue = bValue?.toString().toLowerCase() || '';
      }

      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [books, state.filters, orderBy, order]);

  const paginatedBooks = useMemo(() => {
    const startIndex = state.pagination.page * state.pagination.pageSize;
    return filteredAndSortedBooks.slice(startIndex, startIndex + state.pagination.pageSize);
  }, [filteredAndSortedBooks, state.pagination]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    actions.setPagination({ page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    actions.setPagination({
      pageSize: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  const handleEdit = (book) => {
    navigate(`/edit/${book._id}`);
  };

  const handleDelete = (book) => {
    setConfirmDialog({
      open: true,
      book,
    });
  };

  const confirmDelete = () => {
    if (confirmDialog.book) {
      deleteBookMutation.mutate(confirmDialog.book._id, {
        onSuccess: () => {
          setConfirmDialog({ open: false, book: null });
        },
      });
    }
  };

  const getStatusColor = (status) => {
    return status === 'Available' ? 'success' : 'warning';
  };

  if (isLoading) {
    return <BookTableSkeleton />;
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">
          Failed to load books. Please try again later.
        </Typography>
      </Paper>
    );
  }

  if (filteredAndSortedBooks.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          📚 No books found
        </Typography>
        <Typography color="textSecondary">
          {state.filters.search || state.filters.genre || state.filters.status
            ? 'Try adjusting your filters to see more results.'
            : 'Start by adding your first book to the library.'}
        </Typography>
      </Paper>
    );
  }

  const columns = [
    { id: 'title', label: 'Title', sortable: true, minWidth: 200 },
    { id: 'author', label: 'Author', sortable: true, minWidth: 150 },
    { id: 'genre', label: 'Genre', sortable: true, minWidth: 120 },
    { id: 'publishedYear', label: 'Year', sortable: true, minWidth: 80 },
    { id: 'status', label: 'Status', sortable: true, minWidth: 100 },
    { id: 'actions', label: 'Actions', sortable: false, minWidth: 120 },
  ];

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sortDirection={orderBy === column.id ? order : false}
                  sx={{
                    fontWeight: 600,
                    backgroundColor: theme.palette.grey[50],
                    minWidth: column.minWidth,
                  }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBooks.map((book, index) => (
              <TableRow
                key={book._id}
                hover
                sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {book.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {book.author}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {book.genre}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {book.publishedYear}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={book.status}
                    color={getStatusColor(book.status)}
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Edit book">
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(book)}
                        color="primary"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete book">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(book)}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredAndSortedBooks.length}
        page={state.pagination.page}
        onPageChange={handleChangePage}
        rowsPerPage={state.pagination.pageSize}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        sx={{
          '& .MuiTablePagination-toolbar': {
            paddingRight: 2,
          },
        }}
      />

      <ConfirmDialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, book: null })}
        onConfirm={confirmDelete}
        title="Delete Book"
        message="Are you sure you want to delete this book? This action cannot be undone."
        confirmText="Delete"
        type="delete"
        book={confirmDialog.book}
        loading={deleteBookMutation.isPending}
      />
    </>
  );
};

export default BookTable;