const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });



const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    port: 8889

})

//connect to mysql
db.connect(err => {
    if (err) {
        console.log(err);
    }
    console.log('MySql connected')
})

module.exports = db; 