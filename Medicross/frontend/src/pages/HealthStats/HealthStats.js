import React, { useRef, useState, useEffect } from "react";
import "./HealthStats.css";
import axios from "axios";
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';

const HealthStats = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [condition, setCondition] = useState("");
  const [stats, setStats] = useState("");
  const [update, setUpdate] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successCondition, setSuccessCondition] = useState(false); //for testing purposes only and needs to be replaced with react-router
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [successStats, setSuccessStats] = useState(false);

  const handleSubmitCondition = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3002/api/findrisks");
      
      console.log(response);
      setCondition(response.data);
      if (condition.length >= 1) {
        setSuccessCondition(true);
      }
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Health Stats Failed");
      }
      //errRef.current.focus();
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(condition);
      const response = await axios.get(
        "http://localhost:3002/api/updateconditions",
        { params: { condition: condition } }
      );
      console.log(response);
      setUpdate(response.data);
      if (update.length > 1) {
        setSuccessUpdate(true);
      }
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Health Stats Failed");
      }
      //errRef.current.focus();
    }
  };

  const handleSubmitStats = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3002/api/viewstats");
      
      console.log(response);
      setStats(response.data);
      if (stats.length > 1) {
        setSuccessStats(true);
      }
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Health Stats Failed");
      }
      //errRef.current.focus();
    }
  };

  return (
    <>
    {(() => {
            if (successCondition) {
              return (
                <section>
                <h1>Recent Common Conditions</h1>
                <table className="table">
                <thead>
                  <tr>
                    <th>Condition Name</th>
                    <th>Number of Infected</th>
                  </tr>
                </thead>
                <tbody>
                  {condition.map(({ conditionName, Affected }) => (
                    <tr>
                      <td>{conditionName}</td>
                      <td>{Affected}</td>
                    </tr>
                  ))}
                </tbody>
                </table>
                <p>
                  <Link to="/Profile"> Go to Profile </Link>
                </p>
              </section>
              )
            } 
            else if (successStats) {
              return (
                <section>
                <h1>Your Health Stats</h1>
                <table className="table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Sex</th>
                    <th>Date of Vitals</th>
                    <th>BMI</th>
                    <th>Pulse Rate</th>
                    <th>Respiration Rate</th>
                    <th>Number of Conditions</th>
                    <th>Health Score</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map(({ firstName, lastName, sex, date, BMI, pulseRate, respRate, num_conditions, HealthScore }) => (
                    <tr>
                      <td>{firstName}</td>
                      <td>{lastName}</td>
                      <td>{sex}</td>
                      <td>{date}</td>
                      <td>{BMI}</td>
                      <td>{pulseRate}</td>
                      <td>{respRate}</td>
                      <td>{num_conditions}</td>
                      <td>{HealthScore}</td>
                    </tr>
                  ))}
                </tbody>
                </table>
                <p>
                  <Link to="/Profile"> Go to Profile </Link>
                </p>
              </section>
              )
            } 
            else if (successUpdate) {
              return (
                <section>
                <h1>Condition List is updated!</h1>
                <p>
                  <Link to="/Profile"> Go to Profile </Link>
                </p>
              </section>
              )
            } else {
              return (
                <section>
                <form onSubmit={handleSubmitCondition}>
                    <button>
                        View Common Conditions
                    </button>
                </form>
                <form onSubmit={handleSubmitUpdate}>
                  <label htmlFor="condition">Update Condition:</label>
                  <input
                    type="text"
                    id="condition"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setCondition(e.target.value)}
                    required
                  />
                  <button disabled={!condition ? true : false}>Update</button>
                </form>
                <form onSubmit={handleSubmitStats}>
                    <button>
                        View Stats
                    </button>
                </form>
                <p>
                <Link to="/Profile"> Go to Profile </Link>
                </p>
                </section>
              )
            }
      })()}
    </>
  );
};

export default HealthStats;
