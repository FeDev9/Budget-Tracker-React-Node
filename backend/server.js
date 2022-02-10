const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');


//Database
require('./database');

//set up templete engine
app.set('view engine', 'ejs');


//static files
app.use(express.static('./public'));

app.use(cors());

//Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

//parse json bodies
app.use(express.json());
app.use(cookieParser());



//Routes
const pagesRoute = require('./routes/pages');
const authRoute = require('./routes/auth');
const transactionsRoute = require('./routes/transactions');


app.use('/', pagesRoute);
app.use('/auth', authRoute);
app.use('/transactions', transactionsRoute);



app.listen(3001, () => {
    console.log("server is running on port 3001");
});