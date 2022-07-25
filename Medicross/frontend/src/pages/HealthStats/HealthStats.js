import React, { useRef, useState, useEffect } from "react";
import "./HealthStats.css";
import axios from "axios";
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';

const HealthStats = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [disabledField, setDisabledField] = useState(true);
  const [condition, setCondition] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false); //for testing purposes only and needs to be replaced with react-router

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3002/api/findrisks");
      
      console.log(response);
      setCondition(response.data[0].Affected + " individuals affected by " + response.data[0].conditionName);
      setSuccess(true);
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
        {success ? (
            <section>
            <h1>Recent Common Conditions</h1>
            <br />
            <TextField
                disabled={disabledField}
                value={condition} />
                <p>
                <Link to="/Profile"> Go to Profile </Link>
                </p>
            </section>
        ) : (
            <section>
                <form onSubmit={handleSubmit}>
                    <button>
                        View Common Conditions
                    </button>
                </form>
                <p>
            <Link to="/Profile"> Go to Profile </Link>
            </p>
            </section>
        )}
    </>
  );
};

export default HealthStats;
