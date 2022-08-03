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
  const [doctors, setDoctors] = useState("");
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
                <table className="table" >
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
          </section>
        ) : 
        (
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
          <Link to="/SearchCondition"> Go to Search Condition</Link>
          </p>
            </section>
        )}
    </>
  );
};

export default Search;
