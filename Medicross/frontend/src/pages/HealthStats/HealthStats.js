import React, { useRef, useState, useEffect } from "react";
import "./HealthStats.css";
import axios from "axios";
import TextField from '@mui/material/TextField';

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
      const response = await axios.get("http://localhost:3002/api/findrisks", {
        condition: condition,
      });
      
      console.log(response.data);
      setCondition(response.data);
      setSuccess(true);
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Health Stats Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
        {success ? (
            <section>
            <h1>Conditions</h1>
            <br />
            <TextField
                disabled={disabledField}
                value={condition} />
            </section>
        ) : (
            <section>
                <form onSubmit={handleSubmit}>
                    <button>
                        View Common Conditions
                    </button>
                </form>
            </section>
        )}
    </>
  );
};

export default HealthStats;
