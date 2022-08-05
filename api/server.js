import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import studentRoute from './routes/studentRoutes.js';
import userRoute from './routes/userRoutes.js';
import mongoDBConnect from './config/dbConfig.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

// init express
const app = express();
dotenv.config();


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())

// init env Variabels
const Port = process.env.SERVER_PORT || 5000; 

// Routes
app.use('/api/student', studentRoute)
app.use('/api/user', userRoute)

// Express Error Handling
app.use(errorHandler)


// listen server
app.listen(Port, () => {
    mongoDBConnect()
    console.log(`Server is Running on ${Port}`.bgGreen.black);
})