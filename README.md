# 📚 Book Management Dashboard

A modern, responsive React.js application for managing a book library with full CRUD operations, advanced filtering, and a beautiful user interface.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Material-UI](https://img.shields.io/badge/Material--UI-5.14.20-blue)
![React Query](https://img.shields.io/badge/React%20Query-5.8.4-red)
![React Router](https://img.shields.io/badge/React%20Router-6.20.1-red)

## 🚀 Features

### ✨ Core Functionality
- **📖 Complete CRUD Operations** - Create, Read, Update, Delete books
- **🔍 Advanced Search & Filtering** - Search by title/author, filter by genre and status
- **📄 Pagination** - Navigate through books with configurable page sizes
- **🎯 Sorting** - Sort by any column (title, author, genre, year, status)
- **📊 Statistics Dashboard** - View library statistics at a glance

### 🎨 User Experience
- **📱 Fully Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **🎭 Modern Material Design** - Beautiful, intuitive interface using Material-UI
- **⚡ Loading States** - Skeleton loaders and spinners for better UX
- **🔔 Toast Notifications** - Success/error feedback for all operations
- **❓ Confirmation Dialogs** - Safe deletion with detailed confirmation

### 🛠 Technical Excellence
- **⚛️ React 18+** - Latest React features with functional components and hooks
- **🔄 React Query** - Efficient data fetching with caching and background updates
- **🗺️ React Router v6** - Modern routing with nested routes
- **📝 React Hook Form** - Performant form handling with validation
- **🎛️ Context API** - Global state management for filters and pagination
- **🔍 TypeScript-ready** - Clean, maintainable code structure

## 🏗️ Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── BookForm.jsx        # Form for adding/editing books
│   ├── BookStats.jsx       # Statistics cards component
│   ├── BookTable.jsx       # Main table with sorting and pagination
│   ├── BookFilters.jsx     # Search and filter controls
│   ├── ConfirmDialog.jsx   # Reusable confirmation dialog
│   ├── Header.jsx          # Navigation header
│   └── LoadingSkeleton.jsx # Loading state components
├── pages/                   # Page components
│   ├── Dashboard.jsx       # Main dashboard page
│   └── AddEditBook.jsx     # Add/edit book page
├── services/               # API service layer
│   └── api.js             # API client and mock data
├── hooks/                  # Custom React hooks
│   └── useBooks.js        # Book-related queries and mutations
├── contexts/              # React Context providers
│   └── BookContext.jsx    # Global state for filters/pagination
├── App.js                 # Main app component with providers
└── index.js               # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd book-management-dashboard
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure API endpoint**

Open `src/services/api.js` and update the API base URL:

```javascript
// Replace with your crudcrud.com endpoint
const API_BASE_URL = 'https://crudcrud.com/api/YOUR-UNIQUE-ID/books';
```

To get a free API endpoint:
- Visit [crudcrud.com](https://crudcrud.com/)
- Create a new resource named `books`
- Copy the provided endpoint URL

4. **Start the development server**
```bash
npm start
# or
yarn start
```

The application will open at `http://localhost:3000`

### 🧪 Using Mock Data

For testing purposes, the app includes mock data that simulates a real API. To use mock data:

1. In `src/services/api.js`, set `USE_MOCK_API = true`
2. The app will use local mock data with simulated API delays
3. All CRUD operations will work with in-memory data

## 📱 Usage Guide

### Dashboard
- View library statistics (total books, available/issued count, genres, authors)
- Search books by title or author using the search bar
- Filter books by genre and status using dropdown menus
- Sort books by clicking column headers
- Navigate through pages using pagination controls
- Edit or delete books using action buttons

### Adding Books
1. Click "Add New Book" button on the dashboard
2. Fill in all required fields:
   - Title (required)
   - Author (required)
   - Genre (select from predefined list)
   - Published Year (1000 - current year)
   - Status (Available/Issued)
3. Click "Add Book" to save

### Editing Books
1. Click the edit icon (✏️) next to any book in the table
2. Modify the desired fields in the form
3. Click "Update Book" to save changes

### Deleting Books
1. Click the delete icon (🗑️) next to any book
2. Confirm deletion in the dialog that appears
3. The book will be permanently removed

## 🛠️ Built With

- **[React](https://reactjs.org/)** - Frontend library
- **[Material-UI](https://mui.com/)** - UI component library
- **[React Query](https://tanstack.com/query/)** - Data fetching and caching
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[React Hook Form](https://react-hook-form.com/)** - Form handling
- **[Yup](https://github.com/jquense/yup)** - Form validation
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - Toast notifications
- **[Axios](https://axios-http.com/)** - HTTP client

## 🔧 API Endpoints

The application expects the following REST API endpoints:

- `GET /books` - Fetch all books
- `POST /books` - Create a new book
- `PUT /books/:id` - Update a book by ID
- `DELETE /books/:id` - Delete a book by ID

### Expected Book Schema
```json
{
  "_id": "string",
  "title": "string",
  "author": "string", 
  "genre": "string",
  "publishedYear": "number",
  "status": "Available | Issued"
}
```

## 🎨 Customization

### Themes
The app uses Material-UI's theming system. Customize colors and styles in `src/App.js`:

```javascript
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});
```

### Pagination
Default pagination is set to 10 items per page. Modify in `src/contexts/BookContext.jsx`:

```javascript
pagination: {
  page: 0,
  pageSize: 10, // Change this value
}
```

### Genres
Add or modify available genres in `src/components/BookForm.jsx`:

```javascript
const genreOptions = [
  'Fiction', 'Non-Fiction', 'Mystery',
  // Add your custom genres here
];
```

## 📈 Performance Features

- **React Query Caching** - Automatic background refetching and caching
- **Debounced Search** - Search input debounced to reduce API calls
- **Optimistic Updates** - Immediate UI updates with rollback on errors
- **Lazy Loading** - Code splitting for better initial load times
- **Memoization** - React.memo and useMemo for expensive computations

## 🐛 Troubleshooting

### Common Issues

**API Connection Errors**
- Ensure your crudcrud.com endpoint is correctly configured
- Check browser network tab for API request errors
- Verify CORS settings if using a custom API

**Form Validation Errors** 
- Check that all required fields are filled
- Verify year is between 1000 and current year
- Ensure status is either 'Available' or 'Issued'

**Performance Issues**
- Clear browser cache and reload
- Check React DevTools for unnecessary re-renders
- Monitor network requests in browser dev tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- TanStack team for React Query
- React team for the amazing framework
- All open-source contributors who made this project possible

---

**Made with ❤️ for efficient book management**