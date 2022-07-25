import React, {useRef, useState, useEffect} from 'react';
import './Profile.css'
import axios from 'axios';
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

const Profile = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [sex, setSex] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [insProvider, setInsProvider] = useState("");
    const [insNumber, setInsNumber] = useState("");
    const [insHolder, setInsHolder] = useState("");
    const [email] = useState("");
    const [user, setUser] = useState({});
    

   
    useEffect(() => {
        axios.get("http://localhost:3002/api/getProfile").then((response) => {
            setUser(JSON.stringify(response.data));
        })
        console.log(user.data);
        const parsed_json = JSON.parse(user);
        const getFirstName = parsed_json.firstName
        const getLastName = parsed_json.lastName
        const getBirthDate = parsed_json.birthDate
        const getSex = parsed_json.sex
        const getAddress = parsed_json.address
        const getPhone = parsed_json.phone
        const getInsProvider = parsed_json.insProvider
        const getInsHolder = parsed_json.insHolder
        const getInsNumber = parsed_json.insNumber

        if (getFirstName != null)
        setFirstName(parsed_json.firstName)
        if (getLastName != null)
        setLastName(parsed_json.lastName)
        if(getSex != null)
        setSex(parsed_json.sex)
        if (getBirthDate != null)
        setBirthDate(parsed_json.birthDate)
        if(getAddress != null)
        setAddress(parsed_json.address)
        if (getPhone != null)
        setPhone(parsed_json.phone)
        if (getInsProvider != null)
        setInsProvider(parsed_json.insProvider)
        if (getInsHolder != null)
        setInsHolder(parsed_json.insHolder)
        if (getInsNumber != null)
        setInsNumber(parsed_json.insNumber)

    },[]);
    
    const [disabledField, setDisabledField] = useState(true);
    const [disabledEdit, setDisabledEdit] = useState(false);
    const [disabledSave, setDisabledSave] = useState(true);
    
    const enableEdit = () => {
        setDisabledField(false);
        setDisabledSave(false);
        setDisabledEdit(true);
         
    };

    const saveEdit = async (e) => {
        setDisabledField(true);
        setDisabledSave(true);
        setDisabledEdit(false);

        try {
          const response = await axios.post("http://localhost:3002/api/editProfile", {
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
          });
          console.log(JSON.stringify(response.data));
        } catch (err) {
          if (!err.response) {
            setErrMsg("No Server Response");
          } else if (err.response.status === 409) {
            setErrMsg("Email already exists");
          } else {
            setErrMsg("Update Failed");
          }
          errRef.current.focus();
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
                    onChange={(e) => setFirstName(e.target.value)} />

                <TextField
                    label="Last Name"
                    disabled={disabledField}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} />

                <TextField
                    label="Email"
                    disabled={disabledField}
                    value={email} />
                
                <TextField
                    label="Date of Birth"
                    disabled={disabledField}
                    value={birthDate} 
                    onChange={(e) => setBirthDate(e.target.value)}/>

                <TextField
                    label="Sex"
                    disabled={disabledField}
                    value={sex}
                    onChange={(e) => setSex(e.target.value)} />

                <TextField
                    label="Address"
                    disabled={disabledField}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} />

                <TextField
                    label="Phone"
                    disabled={disabledField}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} />
                
                <TextField
                    label="Insurance Provider"
                    disabled={disabledField}
                    value={insProvider}
                    onChange={(e) => setInsProvider(e.target.value)} />
                
                <TextField
                    label="Insurance Holder"
                    disabled={disabledField}
                    value={insHolder}
                    onChange={(e) => setInsHolder(e.target.value)} />
            
                <TextField
                    label="Insurance Number"
                    disabled={disabledField}
                    value={insNumber}
                    onChange={(e) => setInsNumber(e.target.value)} />
                
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
            </div>
        </div>
    );       
};

export default Profile