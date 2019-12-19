const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log(`app running on port ${process.env.PORT}`)
});