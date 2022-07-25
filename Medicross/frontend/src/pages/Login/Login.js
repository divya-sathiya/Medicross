import React, { useRef, useState, useEffect } from "react";
import "./Login.css";
import Axios from "axios";
import SignUp from "../SignUp/SignUp";
import { Link} from 'react-router-dom';


const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false); //for testing purposes only and needs to be replaced with react-router

  //focus on user input
  useEffect(() => {
    userRef.current.focus();
  }, []);

  //empty out the error message because the user has made changes to the field
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
    const response = await Axios.post(`http://localhost:3002/api/login`, {email: email, password: password});
    console.log(JSON.stringify(response.data));
    setEmail("");
    setPwd("");
    setSuccess(true);
    } catch (err) {
      if (!err.response) {
        setErrMsg('No Server Response');
      } else if (err.response.status === 400){
        setErrMsg('Missing email or password');
      } else if (err.response.status === 401){
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="title" >MEDICROSS</h1>
          <form onSubmit={handleSumbit}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={password}
              required
            />
            <button>Sign In</button>
          </form>
          <p style={{textAlign:'center'}}>
            Need an Account?
            <br />
            <span className="line">
              <Link to= "/SignUp"> Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
