var mysql = require('mysql');

var connection = mysql.createConnection({
    port: 3306,
    host: 'sql9.freemysqlhosting.net',
    user: 'sql9237825',
    password: 'XdwAFaSM3Z',
    database: 'sql9237825'

});

connection.connect();

module.exports = connection;