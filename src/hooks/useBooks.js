import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookService, mockBookService } from '../services/api';
import { toast } from 'react-toastify';

const USE_MOCK_API = true;

const api = USE_MOCK_API ? mockBookService : bookService;

export const QUERY_KEYS = {
  BOOKS: 'books',
  BOOK: 'book',
};

export const useBooks = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.BOOKS],
    queryFn: api.getAllBooks,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    retry: 2,
    onError: (error) => {
      console.error('Error fetching books:', error);
      toast.error('Failed to fetch books. Please try again.');
    },
  });
};


export const useBook = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BOOK, id],
    queryFn: () => api.getBookById(id),
    enabled: !!id, 
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 2,
    onError: (error) => {
      console.error('Error fetching book:', error);
      toast.error('Failed to fetch book details. Please try again.');
    },
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createBook,
    onSuccess: (newBook) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKS] });
      toast.success('Book created successfully!');
      return newBook;
    },
    onError: (error) => {
      console.error('Error creating book:', error);
      toast.error('Failed to create book. Please try again.');
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => api.updateBook(id, data),
    onSuccess: (updatedBook, variables) => {
      queryClient.setQueryData([QUERY_KEYS.BOOK, variables.id], updatedBook);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKS] });
      toast.success('Book updated successfully!');
      return updatedBook;
    },
    onError: (error) => {
      console.error('Error updating book:', error);
      toast.error('Failed to update book. Please try again.');
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deleteBook,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.BOOK, deletedId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKS] });
      toast.success('Book deleted successfully!');
    },
    onError: (error) => {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book. Please try again.');
    },
  });
};

export const useOptimisticBookUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => api.updateBook(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.BOOK, id] });
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.BOOKS] });

      const previousBook = queryClient.getQueryData([QUERY_KEYS.BOOK, id]);
      const previousBooks = queryClient.getQueryData([QUERY_KEYS.BOOKS]);

      if (previousBook) {
        queryClient.setQueryData([QUERY_KEYS.BOOK, id], {
          ...previousBook,
          ...data,
        });
      }

      if (previousBooks) {
        queryClient.setQueryData([QUERY_KEYS.BOOKS], 
          previousBooks.map(book => 
            book._id === id ? { ...book, ...data } : book
          )
        );
      }

      return { previousBook, previousBooks };
    },
    onError: (error, variables, context) => {
      if (context?.previousBook) {
        queryClient.setQueryData([QUERY_KEYS.BOOK, variables.id], context.previousBook);
      }
      if (context?.previousBooks) {
        queryClient.setQueryData([QUERY_KEYS.BOOKS], context.previousBooks);
      }
      toast.error('Failed to update book. Changes have been reverted.');
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOK, variables.id] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKS] });
    },
  });
};

export const useBookStats = () => {
  const { data: books = [], isLoading, error } = useBooks();

  const stats = {
    total: books.length,
    available: books.filter(book => book.status === 'Available').length,
    issued: books.filter(book => book.status === 'Issued').length,
    genres: [...new Set(books.map(book => book.genre))].length,
    authors: [...new Set(books.map(book => book.author))].length,
  };

  return { stats, isLoading, error };
};