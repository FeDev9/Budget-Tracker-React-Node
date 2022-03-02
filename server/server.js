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
app.use(express.static('public'));

app.use(cors());

//Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

//parse json bodies
app.use(express.json());
app.use(cookieParser());



//Routes
const authRoute = require('./routes/Auth');
const transactionsRoute = require('./routes/Transactions');

app.use('/', authRoute);
app.use('/user', transactionsRoute);



app.listen(process.env.PORT || 3001, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});