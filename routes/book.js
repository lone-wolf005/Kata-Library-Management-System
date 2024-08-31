
const {addBook, borrowBook, returnBook, getAllBooks, getAllAvailableBooks} = require('../controller/book');
const {auth} = require('../middleware/auth');

const express = require('express');
const bookRouter = express.Router();

// route for addbook
// {future Scope :add librarian role and he can only add new books}
bookRouter.post('/addBook', addBook);

// Protected routes for only logged-in User
bookRouter.put('/borrowBook/:bookId',auth, borrowBook);
bookRouter.put('/returnBook/:bookId',auth, borrowBook);


module.exports = bookRouter;