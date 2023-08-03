const mongoose = require('mongoose');
require("dotenv").config();
const _ = require('lodash');

mongoose.connect(_.includes(process.env.DB_HOST, 'localhost') ?
  `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}` :
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
);

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!!!!');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose failed to connect: ', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose is disconnected');
});