import "./App.css";
<<<<<<< HEAD
//import React, { useState, useEffect } from "react";
import React from "react";
//import Axios from "axios";
//import Login from "./components/Login.js";
import SignUp from "./components/SignUp.js"
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search"
=======
import React, { useState, useEffect } from "react";
import Login from "./pages/Login/Login.js";
import SignUp from "./pages/SignUp/SignUp.js";
import Navbar from "./pages/Navbar/Navbar"
import Home from "./pages/Home/Home";
import MyHealth from "./pages/MyHealth/MyHealth";
import FindDoctor from "./pages/FindDoctor/FindDoctor";
import Profile from "./pages/Profile/Profile"
import { Routes, Route } from "react-router-dom";
>>>>>>> f2521e6e93c1179c0141eef5f9c22d41039728d0

// ORIGINAL -----------------------------------
// function App() {
//   const [movieName, setMovieName] = useState('');
//   const [Review, setReview] = useState('');
//   const [movieReviewList, setMovieReviewList] = useState([]);
//   const [newReview, setNewReview] = useState("");

//   useEffect(() => {
//     Axios.get('http://localhost:3002/api/get').then((response) => {
//       setMovieReviewList(response.data)
//     })
//   },[])

//   const submitReview = () => {
//     Axios.post('http://localhost:3002/api/insert', {
//       movieName: movieName,
//       movieReview: Review
//     });

//     setMovieReviewList([
//       ...movieReviewList,
//       {
//         movieName: movieName,
//         movieReview: Review
//       },
//     ]);
//   };

//   const deleteReview = (movieName) => {
//     Axios.delete(`http://localhost:3002/api/delete/${movieName}`);
//   };

//   const updateReview = (movieName) => {
//     Axios.put(`http://localhost:3002/api/update`, {
//       movieName: movieName,
//       movieReview: newReview
//     });
//     setNewReview("")
//   };

//   return (
//     <div className="App">
//       <h1> CRUD APPLICATIONS</h1>

//       <div className="form">
//         <label> Movie Name:</label>
//         <input type="text" name="movieName" onChange={(e) => {
//           setMovieName(e.target.value)
//         } }/>
//         <label> Review:</label>
//         <input type="text" name="Review" onChange={(e) => {
//           setReview(e.target.value)
//         }}/>

//         <button onClick={submitReview}> Submit</button>

//         {movieReviewList.map((val) => {
//           return (
//             <div className = "card">
//               <h1> MovieName: {val.movieName} </h1>
//               <p>Movie Review: {val.movieReview}</p>
//               <button onClick={() => { deleteReview(val.movieName) }}> Delete</button>
//               <input type="text" id="updateInput" onChange={(e) => {
//                 setNewReview(e.target.value)
//               } }/>
//               <button onClick={() => {
//                 updateReview(val.movieName)
//               }}> Update</button>
//               </div>
//           );

//           ;
//         })}

//       </div>

//     </div>
//   );
// }

// export default App;
// ORIGINAL -----------------------------------

function App() {

  return (
<<<<<<< HEAD
    <main className="App">
      <Search />
=======

      <main className="App">
        <Navbar/>
      <Routes>
        <Route exact path= "/" element={< Login />} />
        <Route exact path= "/Login" element={< Login />} />
        <Route exact path= "/SignUp" element={< SignUp />} />
      </Routes>
      <Main/>
>>>>>>> f2521e6e93c1179c0141eef5f9c22d41039728d0
    </main>
  );
}

const Main = () => {
  
  return (
    <Routes>
      
      <Route path="/Home" element={<Home />} />
      <Route path="/MyHealth" element={<MyHealth />} />
      <Route path="/FindDoctor" element={<FindDoctor />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
  );
};

export default App;
