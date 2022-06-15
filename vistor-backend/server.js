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
app.use('/api/vistors', require('./router/vistorRoute/vistorRouter'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../vistor-frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'vistor-frontend', 'build', 'index.html')
    )
  );
}

app.use(errorhandler);
app.listen(port, () => console.log('backend start'));
