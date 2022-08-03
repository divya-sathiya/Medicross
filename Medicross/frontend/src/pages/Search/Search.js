import React, { useRef, useState, useEffect } from "react";
import "./Search.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Search = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [disabledField, setDisabledField] = useState(true);

  const [procedure, setProcedure] = useState("");
  const [doctors, setDoctors] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false); //for testing purposes only and needs to be replaced with react-router
  const nav = useNavigate();

  //focus on user input
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // useEffect(() => {
  //   console.log(procedure);

  // }, [procedure]);

  async function handleLogout() {
    localStorage.clear();
    nav("/Login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(procedure);
      const response = await axios.get(
        "http://localhost:3002/api/finddoctors",
        { params: { procedure: procedure } }
      );

      console.log(response.data);

      setDoctors(response.data);
      if (doctors.length > 1) {
        setSuccess(true);
      }
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Search Failed");
      }
      console.log(errMsg);
      //errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h2>Doctors List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map(({ doctorName, title }) => (
                <tr>
                  <td>{doctorName}</td>
                  <td>{title}</td>
                </tr>
              ))}
            </tbody>
          </table>
           <p>
          <Link to="/SearchCondition"> Go to Search Condition</Link>
          </p> 
          <p>
          <Link to="/HealthStats"> Go to Health Stats</Link>
          </p> 
        </section>
      ) : (
        <section>
          <h1>Find Doctors</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="procedure">Procedure:</label>
            <input
              type="text"
              id="procedure"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setProcedure(e.target.value)}
              required
            />
            <button disabled={!procedure ? true : false}>Search</button>
          </form>
          <p>
          <Link to="/Profile"> Go to Profile </Link>
          </p> 
           <p>
          <Link to="/SearchCondition"> Go to Search Condition</Link>
          </p> 
          <p>
          <Link to="/HealthStats"> Go to Health Stats</Link>
          </p> 
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            onClick={handleLogout}
            variant="contained"
            color="primary"
          >
            Logout
          </Button>
        </section>
      )}
    </>
  );
};

export default Search;
