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
