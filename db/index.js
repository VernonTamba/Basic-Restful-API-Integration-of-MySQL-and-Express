require('dotenv').config();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password :process.env.DB_PASS,
  database : process.env.DB_NAME
});

// const connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'expressjs',
//     password : 'password',
//     database : 'expressjs'
// });

connection.connect((err) => {
    if(err) throw err;
    console.log("Connected to database!")
});

const db = {
    createTable: () => {
        const sql = "CREATE TABLE test_table (id INT AUTO_INCREMENT, firstname VARCHAR(80), lastname VARCHAR(80), PRIMARY KEY(id));";
        connection.query(sql, (err) => {
            if(err) throw err;
            console.log("Table created successfully!");
        });
    },
    getAll: () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM test_table";
            connection.query(sql, (err, results) => {
                if(err) return reject(err);
                return resolve(results);
            });
        });
    },
    insertData: () => {
        return new Promise((resolve, reject) => {
            const data = {
                firstname: "Carlos",
                lastname: "Simon"
            }
            const sql = "INSERT INTO test_table SET ?";
            connection.query(sql, data, (err, results) => {
                if(err) return reject(err);
                return resolve("Data inserted successfully!");
            });
        });
    },
    updateData: (id) => {
        return new Promise((resolve, reject) => {
            const data = {
                id: id,
                firstname: "Bob",
                lastname: "Doe"
            }
            const sql = "REPLACE INTO test_table SET ?";
            connection.query(sql, data, (err) => {
                if(err) return reject(err);
                return resolve(`Data with id ${id} was updated successfully!`);
            });
        });
    },
    deleteData: (id) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM test_table WHERE id = ?";
            connection.query(sql, id, (err) => {
                if(err) return reject(err);
                return resolve(`Data with id ${id} was deleted successfully!`);
            });
        });
    }
};

module.exports = db;