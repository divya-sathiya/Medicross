import React, { useRef, useState, useEffect } from "react";
import "./Search.css";
import axios from "axios";
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';

const Search = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [disabledField, setDisabledField] = useState(true);

  const [procedure, setProcedure] = useState("");
  const [doctor, setDoctorAndTitle] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false); //for testing purposes only and needs to be replaced with react-router

  //focus on user input
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // useEffect(() => {
  //   console.log(procedure);
    
  // }, [procedure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(procedure);
      const response = await axios.get("http://localhost:3002/api/finddoctors", {params: {procedure: procedure}});
      //console.log(JSON.stringify(response.data));
      //setDoctor(JSON.stringify(response.data));
      console.log(response);
      setDoctorAndTitle(response.data[0].doctorName + " " + response.data[0].title);
      setSuccess(true);
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
            <h1>Doctors</h1>
            <br />
            <TextField
                disabled={disabledField}
                value={doctor} /> <br></br>
              <Link to="/HealthStats"> Go to HealthStats</Link>
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
                    <button disabled={!procedure ? true : false}>
                        Search
                    </button>
                </form>
                <p>
          {/*<a href="#">Go to Home</a>*/}
          <Link to="/HealthStats"> Go to HealthStats</Link>
          </p>
            </section>
        )}
    </>
  );
};

export default Search;
