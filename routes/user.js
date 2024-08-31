const { registerUser,loginUser, logoutUser } = require('../controller/user');
const express = require('express');
const userRouter = express.Router();

userRouter.post('/register', registerUser); 
userRouter.post('/login', loginUser);


module.exports = userRouter;