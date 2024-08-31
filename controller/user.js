const mongoose = require("mongoose")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()


exports.registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // validation of required fields
      if(!name || !email || !password) {
        return res.status(400).json({ 
          success:false,
          error: "All fields are required" 
        });
      }
      const existingUser = await User.findOne({ email });
  
      if(existingUser) {
        return res.status(400).json({ 
          success: false,
          error: "User already exists"
       });
      }
  
      // Hashing the Password
      const hashedPassword = await bcrypt.hash(password,10);
      
      // Create a new user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
  
      // success response
      return res.status(201).json({
           success: true,
           user,
           message: "User registered successfully"
           });
      
    } catch (error) {
      return res.status(500).json({ 
          success: false,
          error: error.message });
    }
  };