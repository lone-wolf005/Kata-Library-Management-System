
const {addBook, borrowBook, returnBook, getAllBooks, getAllAvailableBooks} = require('../controller/book');
// const {auth} = require('../middleware/auth');
const express = require('express');
const bookRouter = express.Router();

// route for addbook
// {future Scope :add librarian role and he can only add new books}
bookRouter.post('/addBook', addBook);

module.exports = bookRouter;