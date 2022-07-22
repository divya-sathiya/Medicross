const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

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

// db.connect(function(err) {
//     if (err) throw err;
//     var sql = "INSERT INTO `Patient`(`patientId`, `firstName`, `lastName`, `sex`, `birthDate`, `address`, `phone`, `notes`, `chargesDue`, `insProvider`, `insHolder`, `insNumber`, `email`, `password`) VALUES (1001, 'Paul', 'Sherman', 'F', '2000-07-19', '3101 Birmingham Dr, Glen Carbon, IL 62025', '630-994-0342', NULL, 200.00, 'Anthem', 'Paul Sherman', 3456789, 'paul.sherman@msn.com', 'paulsher2345');";
//     db.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result.affectedRows + " record(s) updated");
//     });
//   });

app.get("/", (require, response) => {
  const sqlInsert =
    "INSERT INTO `Patient`(`patientId`, `firstName`, `lastName`, `sex`, `birthDate`, `address`, `phone`, `notes`, `chargesDue`, `insProvider`, `insHolder`, `insNumber`, `email`, `password`) VALUES (1001, 'Paul', 'Sherman', 'F', '2000-07-19', '3101 Birmingham Dr, Glen Carbon, IL 62025', '630-994-0342', NULL, 200.00, 'Anthem', 'Paul Sherman', 3456789, 'paul.sherman@msn.com', 'paulsher2345');";
  db.query(sqlInsert, (err, result) => {
    response.send("Hello world!!!");
  });
});

// app.get("/api/get", (require, response) => {
//     const sqlSelect = "SELECT * FROM movie_reviews";
//     db.query(sqlSelect, (err, result) => {
//         response.send(result);
//     });
// });

// app.post("/api/insert", (require, response) => {
//     const movieName = require.body.movieName;
//     const movieReview = require.body.movieReview;

//     const sqlInsert = "INSERT INTO `movie_reviews` (`movieName`, `movieReview`) VALUES (?,?)";
//     db.query(sqlInsert, [movieName, movieReview], (err, result) => {
//         console.log(error);
//     })
// });

// app.delete("/api/delete/:movieName", (require, response) => {
//     const movieName = require.params.movieName;

//     const sqlDelete = "DELETE FROM `movie_reviews` WHERE `movieName`= ?";
//     db.query(sqlDelete, movieName, (err, result) => {
//         if (err)
//         console.log(error);
//     })
// });

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
