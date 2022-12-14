import React, { useRef, useState, useEffect } from "react";
import "./Profile.css";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const nav = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [insProvider, setInsProvider] = useState("");
  const [insNumber, setInsNumber] = useState("");
  const [insHolder, setInsHolder] = useState("");
  const [email, setEmail] = useState("");
  const [changeMade, setChange] = useState(false);
  const [user, setUser] = useState({});
  const id = localStorage.getItem("patientId");

  async function getUserInfo() {
    try {
      console.log("PROFILE " + id);
      const response = await axios.get("http://localhost:3002/api/getProfile", {
        params: { id: id },
      });
      if (response != undefined) {
        console.log(response.data[0]);
        if (response.data[0].firstName != null)
          setFirstName(response.data[0].firstName);
        if (response.data[0].lastName != null)
          setLastName(response.data[0].lastName);
        if (response.data[0].sex != null) setSex(response.data[0].sex);
        if (response.data[0].birthDate != null)
          setBirthDate(response.data[0].birthDate);
        if (response.data[0].address != null)
          setAddress(response.data[0].address);
        if (response.data[0].phone != null) setPhone(response.data[0].phone);
        if (response.data[0].email != null) setEmail(response.data[0].email);
        if (response.data[0].insProvider != null)
          setInsProvider(response.data[0].insProvider);
        if (response.data[0].insHolder != null)
          setInsHolder(response.data[0].insHolder);
        if (response.data[0].insNumber != null)
          setInsNumber(response.data[0].insNumber);
      }
    } catch (err) {
      console.log(err);
    }
  }
  const [disabledField, setDisabledField] = useState(true);
  const [disabledEdit, setDisabledEdit] = useState(false);
  const [disabledSave, setDisabledSave] = useState(true);

  if (changeMade === false) {
    getUserInfo();
  }

  const enableEdit = () => {
    setDisabledField(false);
    setDisabledSave(false);
    setDisabledEdit(true);
    setChange(true);
  };

  const DeleteUser = async (e) => {
    try {
      const response = await axios.delete(
        "http://localhost:3002/api/deleteUser",
        { params: { email: email } }
      );
      localStorage.clear();
      nav("/Login");
      console.log(response);
    } catch (err) {
      console.log(errMsg);
    }
  };

  async function handleLogout() {
    localStorage.clear();
    nav("/Login");
  };

  async function handleNext() {
    nav("/Search");
  };

  const saveEdit = async (e) => {
    setDisabledField(true);
    setDisabledSave(true);
    setDisabledEdit(false);
    try {
      const response = await axios.put(
        "http://localhost:3002/api/editProfile",
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          birthDate: birthDate,
          sex: sex,
          address: address,
          phone: phone,
          insProvider: insProvider,
          insHolder: insHolder,
          insNumber: insNumber,
        },
        { params: { id: id } }
      );
      console.log("Response" + response.data);
    } catch (err) {
      if (!err.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Update Failed");
      }
      console.log(errMsg);
      //errRef.current.focus(errMsg);
    }
  };

  return (
    <div className="form">
      <h1>My Profile</h1>
      <div className="form-body">
        <TextField
          label="First Name"
          disabled={disabledField}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <TextField
          label="Last Name"
          disabled={disabledField}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <TextField label="Email" disabled={disabledField} value={email} />

        <TextField
          label="Date of Birth"
          disabled={disabledField}
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <TextField
          label="Sex"
          disabled={disabledField}
          value={sex}
          onChange={(e) => setSex(e.target.value)}
        />

        <TextField
          label="Address"
          disabled={disabledField}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <TextField
          label="Phone"
          disabled={disabledField}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <TextField
          label="Insurance Provider"
          disabled={disabledField}
          value={insProvider}
          onChange={(e) => setInsProvider(e.target.value)}
        />

        <TextField
          label="Insurance Holder"
          disabled={disabledField}
          value={insHolder}
          onChange={(e) => setInsHolder(e.target.value)}
        />

        <TextField
          label="Insurance Number"
          disabled={disabledField}
          value={insNumber}
          onChange={(e) => setInsNumber(e.target.value)}
        />
      </div>

      <div class="footer">
        <Button
          onClick={enableEdit}
          variant="contained"
          color="primary"
          disabled={disabledEdit}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          onClick={saveEdit}
          variant="contained"
          color="primary"
          disabled={disabledSave}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          onClick={DeleteUser}
          variant="contained"
          color="primary"
          disabled={disabledEdit}
        >
          Delete
        </Button>
        {/* <p>
          <Link to="/Search"> Find A Doctor</Link>
        </p> */}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          onClick={handleNext}
          variant="contained"
          color="primary"
          disabled={disabledEdit}
        >
          Next
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          onClick={handleLogout}
          variant="contained"
          color="primary"
          disabled={disabledEdit}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
