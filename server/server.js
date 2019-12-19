const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;

const app = express();

app.use((bodyParser.urlencoded({extended: true})));

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});