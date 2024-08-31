const express = require('express');
const cookieParser = require('cookie-parser');
const {connectDB} = require('./database/database');
const dotenv = require('dotenv');
const userRouter = require('./routes/user');

// creating server 
const app =  express();

// using middlewares
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World');
});

// defining routes
app.use('/api/v1/user', userRouter);
// connection to database
connectDB();

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ',process.env.PORT);
});

module.exports =  app;