import React, { useRef, useState, useEffect } from "react";
import "./SignUp.css";
import Axios from "axios";
import axios from "axios";
import { Link} from 'react-router-dom';


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validateMatch, setMatchValid] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  //setting the focus on email
  useEffect(() => {
    console.log(email);
    setEmail(email);
  }, [email]);

  // setting the focus on password and validating password and match password
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
    if (!validPassword) {
      setErrMsg(
        "The password needs 8 to 24 characters. Must include uppercase and lowercase letters, a number, and a special character."
      );
    } else {
      const match = password === matchPassword;
      setMatchValid(match);
      if (!match) {
        setErrMsg("Password fields do not match!");
      } else {
        setErrMsg("");
      }
    }

    errRef.current.focus();
  }, [password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await axios.post("http://localhost:3002/api/register", {
        email: email,
        password: password,
      });
      console.log(JSON.stringify(response.data));
      setEmail("");
      setPassword("");
      setMatchPassword("");
      setSuccess(true);
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 409) {
        setErrMsg("Email already exists");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <br />
          <p>
            <Link to= "/"> Sign In</Link>
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
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Confirm Password:</label>
            <input
              type="password"
              id="matchPassword"
              onChange={(e) => setMatchPassword(e.target.value)}
              required
            />
            <button disabled={!validPassword || !validateMatch ? true : false}>
              Sign Up
            </button>
          </form>
          <p>
            Already Registered?
            <br />
            <span className="line">
            <Link to= "/"> Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default SignUp;
