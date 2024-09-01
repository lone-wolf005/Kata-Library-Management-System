
const {addBook, borrowBook, returnBook, getAllBooks, getAllAvailableBooks} = require('../controller/book');
const {isAuthenticated} = require('../middleware/auth');

const express = require('express');
const bookRouter = express.Router();

// route for addbook
// {future Scope :add librarian role and he can only add new books}
bookRouter.post('/addBook', addBook);

// Protected routes for only logged-in User
bookRouter.put('/borrowBook/:bookId',isAuthenticated, borrowBook);
bookRouter.put('/returnBook/:bookId',isAuthenticated, returnBook);

// for fetching allbooks data
bookRouter.get('/getAllBooks',getAllBooks);
bookRouter.get('/getAllAvailableBooks', getAllAvailableBooks);

module.exports = bookRouter;