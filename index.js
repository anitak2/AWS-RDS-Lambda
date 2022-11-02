//const con = require('./dbConnect')
const express = require("express");
const app = express();
const mysql = require('mysql');
// AWS RDS connections
 pool = mysql.createPool({
    connectionLimit : 10,
    host: "database-1.cppptdr2uvr0.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "poikjhnbv"
});
// run once for first time connect then comment it to run query to create db and table

/* con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.end();
});  */

// RDS - create DATABASE and create a table
pool.getConnection(function(err, connection) {
    if (err) throw err;

    connection.query('CREATE DATABASE IF NOT EXISTS main;');
    connection.query('USE main;');
    connection.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), age int, PRIMARY KEY(id));', function(error, result, fields) {
        console.log(result);
    });
    connection.end();
});

app.get('/', (req, res) => {
    console.log("connected...")
    res.send({message: "Connected to server"})
})

 app.post('/users', (req, res) => {
    if (req.query.username && req.query.email && req.query.age) {
        console.log('Request received');
        pool.getConnection(function(err, connection) {
            connection.query(`INSERT INTO main.users (username, email, age) VALUES ('${req.query.username}', '${req.query.email}', '${req.query.age}')`, function(err, result, fields) {
                if (err) res.send(err);
                if (result) res.send({username: req.query.username, email: req.query.email, age: req.query.age});
                if (fields) console.log(fields);
            });
        });
    } else {
        console.log('Missing a parameter');
    }
}); 

app.get('/users', (req, res) => {
    pool.getConnection(function(err, connection) {
        connection.query(`SELECT * FROM main.users`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) res.send(result);
        });
    });
});


app.listen(8080, (err, data) => {
    if (err) throw err;
    else 
    console.log("connected to localhost..")
})