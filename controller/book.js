const mongoose = require("mongoose")
const Book = require('../models/Book')
const User = require('../models/User')
const { generateNumericId } = require('../utils/idGenerator');
require("dotenv").config();

exports.addBook = async (req, res) => {
    try {
        const { title, author,publishedYear } = req.body;

        // validating all required fields

        if(!title || !author || !publishedYear) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Create a new book

        const uniqueid = generateNumericId();
        
        const book = await Book.create({
            ISBN :uniqueid,
            title,
            author,
            publishedYear,
            isAvailable: true
        });
        res.status(201).json({
            success: true,
            data: book,
            message: "Book added successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: "Internal Server Error",
            message: error.message
        });
    }
};

exports.borrowBook  = async (req, res) => {
    try {
        const { bookId } = req.params;

        const userId = req.user.id;
        

        
        // Find the book by ID

        const book = await Book.findById(bookId);

        // Check if the book exists

        if(!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        // Check if the book is available for borrowing
        
        if(!book.isAvailable) {
            return res.status(400).json({
                success: false,
                message: "Book is not available for borrowing"
            });
        }
        
        // Update the book status to borrowed
        
        book.isAvailable = false;
        await book.save();
        
        // update userdata 
        // future Scope{add validation on number of books borrowed by user}
        await User.findByIdAndUpdate({
            _id:userId
        }, {
            $push:{
                borrowedBooks:bookId
            },
        
        },{new:true})

        return  res.status(200).json({
            success: true,
            data: book,
            message: "Book borrowed successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: "Internal Server Error",
            message: error.message
        });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const userId = req.user.id;


        // Find the book by ID
        const book = await Book.findById(bookId);

        // Check if the book exists
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        // Check if the book is currently borrowed
        if (book.isAvailable) {
            return res.status(400).json({
                success: false,
                message: "Book is already returned or was never borrowed"
            });
        }

        // Update the book status to available
        book.isAvailable = true;
        await book.save();

        // Update user data by removing the book from the borrowedBooks array
        await User.findByIdAndUpdate(userId, {
            $pull: {
                borrowedBooks: bookId
            }
        }, { new: true });

        return res.status(200).json({
            success: true,
            data: book,
            message: "Book returned successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: "Internal Server Error",
            message: error.message
        });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            success: true,
            data: books,
            message: "Books fetched successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: "Internal Server Error",
            message: error.message
        });
    }
};

exports.getAllAvailableBooks = async (req, res) => {
    try {
        const books = await Book.find({ isAvailable: true });
        res.status(200).json({
            success: true,
            data: books,
            message: "Available books fetched successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            data: "Internal Server Error",
            message: error.message
        });
    }
};



