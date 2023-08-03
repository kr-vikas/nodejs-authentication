const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
require('./connection/db');
const routes = require('./controllers/routes');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

routes(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});