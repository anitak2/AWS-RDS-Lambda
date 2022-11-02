const mysql = require('mysql');
// AWS RDS connections
 con = mysql.createConnection({
    host: "database-1.cppptdr2uvr0.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "poikjhnbv"
});
// run once for first time connect then comment it to run query to create db and table

/* con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.end();
}); */

// RDS - create DATABASE and create a table
con.connect(function(err) {
    if (err) throw err;

    con.query('CREATE DATABASE IF NOT EXISTS main;');
    con.query('USE main;');
    con.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), age int, PRIMARY KEY(id));', function(error, result, fields) {
        console.log(result);
    });
    con.end();
});
module.exports = con