import React, { useRef, useState, useEffect } from "react";
import "./SearchCondition.css";
import axios from "axios";
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';

const SearchCondition = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [disabledField, setDisabledField] = useState(true);

  const [condition, setCondition] = useState("");
  const [info, setInfo] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false); //for testing purposes only and needs to be replaced with react-router

  //focus on user input
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // useEffect(() => {
  //   console.log(condition);
    
  // }, [condition]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(condition);
      const response = await axios.get("http://localhost:3002/api/findCondition", {params: {condition: condition}});
      
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
            <h2>Doctors List</h2>
                <table className="table" >
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
                                <td>{description}</td>
                              </tr>
                      ))}  
                    </tbody>
                </table>
          </section>
        ) : 
        (
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
                    <button disabled={!condition ? true : false}>
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

export default SearchCondition;
