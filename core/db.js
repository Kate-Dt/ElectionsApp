const mysql = require('mysql');
const dbSettings = require('../dbSettings');
const createError = require('http-errors');

//general method for executing sql queries
exports.executeSql = (sql, callback) => {
  let connection = new mysql.createConnection(dbSettings.dbConfig);
  connection.connect((err) => {
      if (err) {
          createError(500);
      }
      connection.query(sql, (err, result) => {
          if (err) {
              createError(500);
          }
          callback(result);
       })
    });
};

//creating database electionsDB
exports.createDB = (req, callback) => {
    let connection = new mysql.createConnection(dbSettings.dbConfig);
    connection.connect((err) => {
        if (err) {
            createError(500);
        }
        let queryCreateDB = 'CREATE DATABASE IF NOT EXISTS electionsDB';
        connection.query(queryCreateDB, (err, result) => {
            if (err) {
                createError(500);
            }
            console.log('Database created');
            callback.json("OK");
        });
    });
};

//creating table election in electionsDB database
exports.createElectionsTable = (req, callback) => {
    let connection = new mysql.createConnection(dbSettings.dbConfig);
    connection.connect((err) => {
        if (err) {
            createError(500);
        }
        let queryCreateTable = 'CREATE TABLE IF NOT EXISTS election ' +
            '(id INT AUTO_INCREMENT PRIMARY KEY, ' +
            'name VARCHAR(1024) NOT NULL, ' +
            'yes INT NOT NULL DEFAULT 0, ' +
            'no INT NOT NULL DEFAULT 0)';
        connection.query(queryCreateTable, (err, result) =>{
            if (err) {
                createError(500);
            }
            console.log('Table Created');
            callback.json("OK");
        });
    });
};