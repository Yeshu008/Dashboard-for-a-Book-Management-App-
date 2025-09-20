import axios from 'axios';


const API_BASE_URL = 'https://crudcrud.com/api/577571cba4064ff985445a44197ccfd9/books';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});


api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response || error.message);
    return Promise.reject(error);
  }
);


export const bookService = {
  
  getAllBooks: async () => {
    const response = await api.get('/');
    return response.data;
  },

  
  getBookById: async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  
  createBook: async (bookData) => {
    const response = await api.post('/', bookData);
    return response.data;
  },

  
  updateBook: async (id, bookData) => {
    const response = await api.put(`/${id}`, bookData);
    return response.data;
  },

  
  deleteBook: async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
  },
};


export const mockBooks = [
  {
    _id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classic Literature',
    publishedYear: 1925,
    status: 'Available'
  },
  {
    _id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Classic Literature',
    publishedYear: 1960,
    status: 'Issued'
  },
  {
    _id: '3',
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian Fiction',
    publishedYear: 1949,
    status: 'Available'
  },
  {
    _id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    publishedYear: 1813,
    status: 'Available'
  },
  {
    _id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Coming-of-age',
    publishedYear: 1951,
    status: 'Issued'
  },
  {
    _id: '6',
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    genre: 'Fantasy',
    publishedYear: 1997,
    status: 'Available'
  },
  {
    _id: '7',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    publishedYear: 1954,
    status: 'Available'
  },
  {
    _id: '8',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Science Fiction',
    publishedYear: 1965,
    status: 'Issued'
  },
  {
    _id: '9',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    publishedYear: 1937,
    status: 'Available'
  },
  {
    _id: '10',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian Fiction',
    publishedYear: 1932,
    status: 'Available'
  },
  {
    _id: '11',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    genre: 'Thriller',
    publishedYear: 2003,
    status: 'Issued'
  },
  {
    _id: '12',
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    genre: 'Thriller',
    publishedYear: 2012,
    status: 'Available'
  }
];


export const mockBookService = {
  getAllBooks: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockBooks;
  },

  getBookById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const book = mockBooks.find(book => book._id === id);
    if (!book) throw new Error('Book not found');
    return book;
  },

  createBook: async (bookData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const newBook = {
      _id: Date.now().toString(),
      ...bookData
    };
    mockBooks.push(newBook);
    return newBook;
  },

  updateBook: async (id, bookData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const index = mockBooks.findIndex(book => book._id === id);
    if (index === -1) throw new Error('Book not found');
    
    mockBooks[index] = { ...mockBooks[index], ...bookData };
    return mockBooks[index];
  },

  deleteBook: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockBooks.findIndex(book => book._id === id);
    if (index === -1) throw new Error('Book not found');
    
    const deletedBook = mockBooks.splice(index, 1)[0];
    return deletedBook;
  },
};

export default api;