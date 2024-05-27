const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

/*------------------------------------------
--------------------------------------------
parse application/json
--------------------------------------------
--------------------------------------------*/
app.use(bodyParser.json());

/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root', /* MySQL User */
  password: '', /* MySQL Password */
  database: 'library' /* MySQL Database */
});

/*------------------------------------------
--------------------------------------------
Shows Mysql Connect
--------------------------------------------
--------------------------------------------*/
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected with App...');
});

/**
 * Get All books
 *
 * @return response()
 */
app.get('/api/books', (req, res) => {
  let sqlQuery = "SELECT * FROM books";
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * Get Single Item
 *
 * @return response()
 */
app.get('/api/books/:id', (req, res) => {
  let sqlQuery = "SELECT * FROM books WHERE id=" + req.params.id;
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/books', (req, res) => {
  let data = {
    book: req.body.book,
    release_date: req.body.release_date,
    volume: req.body.volume
  };
  
  let sqlQuery = "INSERT INTO books SET ?";
  
  let query = conn.query(sqlQuery, data, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * Update Item
 *
 * @return response()
 */
app.put('/api/books/:id', (req, res) => {
  let sqlQuery = "UPDATE books SET book='"+req.body.book+"', release_date='"+req.body.release_date+"', volume='"+req.body.volume+"' WHERE id="+req.params.id;
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * Delete Item
 *
 * @return response()
 */
app.delete('/api/books/:id', (req, res) => {
  let sqlQuery = "DELETE FROM books WHERE id=" + req.params.id;
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results) {
  return JSON.stringify({"status": 200, "error": null, "response": results});
}

/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/
app.listen(3000, () => {
  console.log('Server started on port 3000...');
});
