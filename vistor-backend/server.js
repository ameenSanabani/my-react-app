const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const fileupload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const mongoDB = require('./utilty/db');
const errorhandler = require('./middleWare/errorMiddle');

const app = express();

mongoose.set('strictQuery', false);

mongoDB();

app.use(
  express.json({
    limit: '50mb',
  })
);
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: false,
  })
);

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

const port = process.env.PORT || 8000;

app.use(fileupload());

app.use('/users', require('./router/usersR/userRoute'));
app.use('/api/vistors', require('./router/vistorRoute/vistorRouter'));
app.use('/api/product', require('./router/productRoute/productR'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../vistor-frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'vistor-frontend', 'build', 'index.html')
    )
  );
}

app.use(errorhandler);

const server = require('http').createServer(
  {
    maxHeaderSize: 32768,
  },
  app
);

server.listen(port, () => console.log(`Backend started on port ${port}`));
