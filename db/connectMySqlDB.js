const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'website'
});
connection.connect(err=>{
    if (err) {
        return console.log('Error: ', err);
    }
    console.log('database connected....id: '+ connection.threadId);
})
module.exports = connection;