const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    database: '4050project',
    user: "root",
    password: "admin"
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM user', function(error,results,fields) {
    if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
    console.log('gathered info');
});



