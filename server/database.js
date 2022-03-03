const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });


//create connection 
// const db = mysql.createPool({
//     host: 'eu-cdbr-west-02.cleardb.net',
//     user: 'b7a5f66721a6b6',
//     password: '660b4226',
//     database: 'heroku_27e06831b1f3ac2',
// })

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