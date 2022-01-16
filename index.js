const express = require('express');

const cors = require('cors');

const books = require('./books/bookController');
const movies = require('./movies/movieController');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/books', books);
app.use('/movies', movies);

app.listen(port, function(){
    console.log("App listening at " + port);
})