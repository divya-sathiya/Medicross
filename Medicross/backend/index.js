const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

// DATABASE CONNECTION
var db = mysql.createConnection({
  host: "34.132.227.83",
  user: "root",
  password: "sqlwarriors4119",
  database: "Medicross",
  port: 3306,
});

//CONNECTION VALIDATION
db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//TESTING QUERY
// app.get("/", (require, response) => {
//   const sqlInsert =
//     "SELECT * FROM Patient WHERE patientId = 1001;";
//   db.query(sqlInsert, (err, result) => {
//     if (result.length == 0) response.send("User not found!");
//     else response.send(result);
//   });
// });

// AXIOS GET EXAMPLE
// app.get("/api/get", (require, response) => {
//     const sqlSelect = "SELECT * FROM movie_reviews";
//     db.query(sqlSelect, (err, result) => {
//         response.send(result);
//     });
// });

// AXIOS POST EXAMPLE
// app.post("/api/insert", (require, response) => {
//     const movieName = require.body.movieName;
//     const movieReview = require.body.movieReview;

//     const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES (?,?)";
//     db.query(sqlInsert, [movieName, movieReview], (err, result) => {
//         console.log(error);
//     })
// });

// LOGIN
app.post("/api/login", (require, response) => {
  const email = require.body.email;
  const password = require.body.password;

  const sqlQuery = "SELECT * FROM Patient WHERE email = ? AND password = ?";
  db.query(sqlQuery, [email, password], (err, result) => {
    if (result.length == 0) response.sendStatus(401);
    else response.send("login successful");
  });
});

// app.post("/api/login", (require, response) => {
//   const email = require.body.email;
//   const password = require.body.password;

//   const sqlQuery = "SELECT * FROM Patient WHERE email = ? AND password = ?";
//   db.query(sqlQuery, [email, password], (err, result) => {
//     if (result.length == 0) response.send("Incorrect Email/Password");
//     else response.send("login successful");
//   });
// });
// AXIOS DELETE EXAMPLE
// app.delete("/api/delete/:movieName", (require, response) => {
//     const movieName = require.params.movieName;

//     const sqlDelete = "DELETE FROM `movie_reviews` WHERE `movieName`= ?";
//     db.query(sqlDelete, movieName, (err, result) => {
//         if (err)
//         console.log(error);
//     })
// });

// AXIOS PUT EXAMPLE
// app.put("/api/update/", (require, response) => {
//     const movieName = require.body.movieName;
//     const movieReview = require.body.movieReview;

//     const sqlUpdate = "UPDATE `movie_reviews` SET `movieReview` = ? WHERE `movieName`= ?";
//     db.query(sqlUpdate, [movieReview,movieName ], (err, result) => {
//         if (err)
//         console.log(error);
//     })
// });

app.listen(3002, () => {
  console.log("running on port 3002");
});
