import React, { useRef, useState, useEffect } from "react";
import "./SearchCondition.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const SearchCondition = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [disabledField, setDisabledField] = useState(true);

  const [condition, setCondition] = useState("");
  const [info, setInfo] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false); //for testing purposes only and needs to be replaced with react-router
  const nav = useNavigate();

  //focus on user input
  useEffect(() => {
    userRef.current.focus();
  }, []);

  async function handleLogout() {
    localStorage.clear();
    nav("/Login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(condition);
      const response = await axios.get(
        "http://localhost:3002/api/findCondition",
        { params: { condition: condition } }
      );

      console.log(response.data);

      setInfo(response.data);
      if (info.length > 1) {
        setSuccess(true);
      }
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("No Conditions Found");
      }
      console.log(errMsg);
      //errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h2>Conditions List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Condition</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {info.map(({ conditionName, description }) => (
                <tr>
                  <td>{conditionName}</td>
                  <br></br>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            <Link to="/Profile"> Go to Profile </Link>
          </p>
          <p>
            <Link to="/Search"> Go to Search Doctors</Link>
          </p>
          <p>
            <Link to="/HealthStats"> Go to Health Stats</Link>
          </p>
        </section>
      ) : (
        <section>
          <h1>Find Condition</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="condition">Condition:</label>
            <input
              type="text"
              id="condition"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setCondition(e.target.value)}
              required
            />
            <button disabled={!condition ? true : false}>Search</button>
          </form>
          <p>
            <Link to="/Profile"> Go to Profile </Link>
          </p>
          <p>
            <Link to="/Search"> Go to Search Doctors</Link>
          </p>
          <p>
            <Link to="/HealthStats"> Go to Health Stats</Link>
          </p>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={handleLogout} variant="contained" color="primary">
            Logout
          </Button>
        </section>
      )}
    </>
  );
};

export default SearchCondition;
