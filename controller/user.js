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

exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validation of required fields
      if(!email || !password) {
        return res.status(400).json({
          success: false,
          error: "All fields are required"
        });
      }
  
      // Check if user exists
      const user = await User.findOne({ email });
  
      if(!user) {
        return res.status(400).json({
          success: false,
          error: "User does not exist"
        });
      }
  
      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if(!isMatch) {
        return res.status(400).json({
          success: false,
          error: "Invalid credentials"
        });
      }
  
      // Generate JWT token

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });
      
      user.token = token;
      user.password = undefined;
  
      const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
      }
  
      return res.cookie("token", token, options).status(200).json({
          success: true,
          user,
          message: `User Login Success`,
        });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };

  exports.logoutUser = async (req, res) => {
    try {
        return res.status(200).cookie("token","",{
            expires:new Date (Date.now()),
            }).json({
                success:true,
                message:"User Logged Out Successfully",
            });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  };