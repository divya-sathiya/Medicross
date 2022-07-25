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

//AQ1
app.get("/finddoctors", (require, response) => {
  const sqlInsert =
    "SELECT name as doctorName, title FROM Practitioner NATURAL JOIN Insurance WHERE insProvider = (SELECT insProvider FROM Procedures NATURAL JOIN NeedProcedure NATURAL JOIN Patient WHERE name = ? AND patientId = ?) AND LOCATE(title,(SELECT description FROM Procedures WHERE name = ?)) > 0 ORDER BY name LIMIT 15;";
  const user = 1000; //get patientId
  const procedureName = "Physical Examination"; //type in procedure name "req.body.procedureName"
  db.query(sqlInsert, [procedureName, user, procedureName], (err, result) => {
    if (result.length == 0) response.send("No Doctors Found!");
    else response.send(result);
  });
});

//AQ2
app.get("/findrisks", (require, response) => {
  const sqlInsert =
    "SELECT name as conditionName, count(patientId) as Affected FROM Patient NATURAL JOIN HasCondition NATURAL JOIN Conditions WHERE sex = ? AND age > ? GROUP BY conditionName ORDER BY FemAffected DESC, avgAge DESC, conditionName LIMIT 15;";
    const gender = 'F'; //use querry to get gender
    const age = 1; //use querry to get age
    db.query(sqlInsert, [gender,age], (err, result) => {
    if (result.length == 0) response.send("Error!");
    else response.send(result);
  });
}); 

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

// REGISTER
app.post("/api/register", (require, response) => {
  const email = require.body.email;
  const password = require.body.password;
  const sqlSearch = "SELECT * FROM Patient WHERE email = ?";
  db.query(sqlSearch, [email], (err, result) => {
    if (result.length > 0) {
      response.sendStatus(409);
    } else {
      const sqlQuery =
        "INSERT INTO `Patient`(`email`, `password`) VALUES (?, ?)";
      db.query(sqlQuery, [email, password], (err, result) => {
        response.send("registration successful");
      });
    }
  });
});

// GET PROFILE
app.get("/api/getProfile", (require, response) => {
  const patientId = 1000;
  const sqlSearch =
    "SELECT email,firstName,lastName,birthDate,sex,address,phone,insProvider,insHolder,insNumber FROM Patient WHERE patientId = ?";
  db.query(sqlSearch, [patientId], (err, result) => {
    response.send(result);
    console.log(result);
  });
});

// EDIT PROFILE
app.put("/api/editProfile", (require, response) => {
  const patientId = 1000;
  const email = require.body.email;
  const firstName = require.body.firstName;
  const lastName = require.body.lastName;
  const birthDate = require.body.birthDate;
  const sex = require.body.sex;
  const address = require.body.address;
  const phone = require.body.phone;
  const insProvider = require.body.insProvider;
  const insHolder = require.body.insHolder;
  const insNumber = require.body.insNumber;

  const sqlQuery =
    "UPDATE `Patient` SET `email`=?,`firstName`=?,`lastName`=?,`birthDate`= ?, `sex`=?,`address`=?,`phone`=?,`insProvider`=?,`insHolder`=?,`insNumber`=? WHERE `patientId`=?";
  db.query(
    sqlQuery,
    [
      email,
      firstName,
      lastName,
      birthDate,
      sex,
      address,
      phone,
      insProvider,
      insHolder,
      insNumber,
      patientId,
    ],
    (err, result) => {
      if (err) console.log(err.message);
      response.send(result);
    }
  );
});

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
