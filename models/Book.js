const mongoose = require('mongoose');

const Book = new mongoose.Schema({
    ISBN:{
        type:Number,
        required:true,
        unique:true,
    },
    title:{
        type:String,
        required:true,
    },
    author: {
        type:String,
        required:true,
    },
    publishedYear: {
        type:Number,
        required:true,
    },
    isAvailable: {
        type:Boolean,
        default:true,
    },
    // Add a reference to the user who borrowed the book

    // Reference to the user who borrowed the book
    borrowedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    
});

module.exports = mongoose.model("Book", Book);