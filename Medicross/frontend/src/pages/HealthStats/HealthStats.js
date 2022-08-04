import React, { useRef, useState, useEffect } from "react";
import "./HealthStats.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

const HealthStats = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [condition, setCondition] = useState("");
  const [stats, setStats] = useState("");
  const [history, setHistory] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successCondition, setSuccessCondition] = useState(false); //for testing purposes only and needs to be replaced with react-router
  const [successHistory, setSuccessHistory] = useState(false);
  const [successStats, setSuccessStats] = useState(false);
  const id = localStorage.getItem("patientId");

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

  const handleSubmitHistory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3002/api/viewconditions");

      console.log(response);
      setHistory(response.data);
      if (update.length > 1) {
        setSuccessHistory(true);
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
      const response = await axios.get("http://localhost:3002/api/viewstats", {
        params: { id: id },
      });

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
              <p>
                <Link to="/Search"> Go to Search Doctors</Link>
              </p>
              <p>
                <Link to="/SearchCondition"> Go to Search Condition</Link>
              </p>
            </section>
          );
        } else if (successStats) {
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
                    <th>Health Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map(
                    ({
                      firstName,
                      lastName,
                      sex,
                      date,
                      BMI,
                      pulseRate,
                      respRate,
                      num_conditions,
                      HealthScore,
                      HealthStatus,
                    }) => (
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
                        <td>{HealthStatus}</td>
                      </tr>
                    )
                  )}
                </tbody>

                </table>
                <p>
                  <Link to="/Profile"> Go to Profile </Link>
                </p>
              </section>
              )
            } 
            else if (successHistory) {
              return (
                <section>
                <h1>Your Medical History</h1>
                <table className="table">
                <thead>
                  <tr>
                    <th>My Conditons</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map(({ MyCondition }) => (
                    <tr>
                      <td>{MyCondition}</td>
                    </tr>
                  ))}
                </tbody>
                </table>
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
                <form onSubmit={handleSubmitHistory}>
                    <button>
                        View Medical History
                    </button>
                </form>
                <form onSubmit={handleSubmitStats}>
                    <button>
                        View Stats
                    </button>
                </form>
                <p>
                <Link to="/Profile"> Go to Profile </Link>
              </p>
              <p>
                <Link to="/Search"> Go to Search Doctors</Link>
              </p>
              <p>
                <Link to="/SearchCondition"> Go to Search Condition</Link>
              </p>
            </section>
          );
        }
      })()}
    </>
  );
};

export default HealthStats;
