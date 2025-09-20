import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  filters: {
    search: '',
    genre: '',
    status: '',
  },
  pagination: {
    page: 0,
    pageSize: 10,
  },
  sortModel: [],
};

// Action types
const ActionTypes = {
  SET_FILTERS: 'SET_FILTERS',
  SET_SEARCH: 'SET_SEARCH',
  SET_GENRE_FILTER: 'SET_GENRE_FILTER',
  SET_STATUS_FILTER: 'SET_STATUS_FILTER',
  SET_PAGINATION: 'SET_PAGINATION',
  SET_SORT_MODEL: 'SET_SORT_MODEL',
  RESET_FILTERS: 'RESET_FILTERS',
};

// Reducer function
const bookReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, page: 0 }, // Reset to first page when filtering
      };
    case ActionTypes.SET_SEARCH:
      return {
        ...state,
        filters: { ...state.filters, search: action.payload },
        pagination: { ...state.pagination, page: 0 },
      };
    case ActionTypes.SET_GENRE_FILTER:
      return {
        ...state,
        filters: { ...state.filters, genre: action.payload },
        pagination: { ...state.pagination, page: 0 },
      };
    case ActionTypes.SET_STATUS_FILTER:
      return {
        ...state,
        filters: { ...state.filters, status: action.payload },
        pagination: { ...state.pagination, page: 0 },
      };
    case ActionTypes.SET_PAGINATION:
      return {
        ...state,
        pagination: { ...state.pagination, ...action.payload },
      };
    case ActionTypes.SET_SORT_MODEL:
      return {
        ...state,
        sortModel: action.payload,
      };
    case ActionTypes.RESET_FILTERS:
      return {
        ...state,
        filters: initialState.filters,
        pagination: { ...state.pagination, page: 0 },
      };
    default:
      return state;
  }
};

// Create context
const BookContext = createContext();

// Context provider component
export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  // Action creators
  const actions = {
    setFilters: (filters) => dispatch({ type: ActionTypes.SET_FILTERS, payload: filters }),
    setSearch: (search) => dispatch({ type: ActionTypes.SET_SEARCH, payload: search }),
    setGenreFilter: (genre) => dispatch({ type: ActionTypes.SET_GENRE_FILTER, payload: genre }),
    setStatusFilter: (status) => dispatch({ type: ActionTypes.SET_STATUS_FILTER, payload: status }),
    setPagination: (pagination) => dispatch({ type: ActionTypes.SET_PAGINATION, payload: pagination }),
    setSortModel: (sortModel) => dispatch({ type: ActionTypes.SET_SORT_MODEL, payload: sortModel }),
    resetFilters: () => dispatch({ type: ActionTypes.RESET_FILTERS }),
  };

  const value = {
    state,
    actions,
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};

// Custom hook to use the context
export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};