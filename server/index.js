require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { db_url, PORT } = process.env;
const cors = require('cors');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:3000']
}))

// routes
app.use('/', require('./controllers/Feed'));
app.use('/api/signup', require('./controllers/Signup'));
app.use('/api/login', require('./controllers/Login'));
app.use('/api/post', require('./controllers/HandlePost'));

// database connection
const db_options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(db_url, db_options ,(err) => {
    if (err) throw err;
    console.log('database connected');
})

// server connection
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});