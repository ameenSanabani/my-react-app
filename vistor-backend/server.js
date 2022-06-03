const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');

const mongoDB = require('./utilty/db');
const errorhandler = require('./middleWare/errorMiddle');

const app = express();

mongoDB();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', require('./router/usersR/userRoute'));

app.use(errorhandler);
app.listen(port, () => console.log('backend start'));
