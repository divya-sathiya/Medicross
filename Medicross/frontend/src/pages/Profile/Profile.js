import React, {useState, useEffect} from 'react';
import './Profile.css'
import axios from 'axios';
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

const Profile = () => {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age] = useState("");
    const [sex, setSex] = useState("");
    const [birthDate] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [insProvider, setInsProvider] = useState("");
    const [insNumber, setInsNumber] = useState("");
    const [insHolder, setInsHolder] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {
        const user_json = JSON.stringify(user);
        
        const parsed_json = JSON.parse(user_json);
        const getEmail = parsed_json.email
        const getFirstName = parsed_json.firstName
        const getLastName = parsed_json.lastName
        const getSex = parsed_json.sex
        const getAddress = parsed_json.address
        const getPhone = parsed_json.phone
        const getInsProvider = parsed_json.insProvider
        const getInsHolder = parsed_json.insHolder
        const getInsNumber = parsed_json.insNumber

        if(getEmail != null)
        setEmail(parsed_json.email)
        if (getFirstName != null)
        setFirstName(parsed_json.firstName)
        if (getLastName != null)
        setLastName(parsed_json.lastName)
        if(getSex != null)
        setSex(parsed_json.sex)
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
        setPassword(parsed_json.password)

    },[user]);
    
    const [disabledField, setDisabledField] = useState(true);
    const [disabledEdit, setDisabledEdit] = useState(false);
    const [disabledSave, setDisabledSave] = useState(true);
    
    const enableEdit = () => {
        setDisabledField(false);
        setDisabledSave(false);
        setDisabledEdit(true);
         
    };

    const saveEdit = () => {
        setDisabledField(true);
        setDisabledSave(true);
        setDisabledEdit(false); 
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
                    value={email}
                    placeholder="Email "
                    onChange={(e) => setEmail(e.target.value)} />
                
                <TextField
                    className="password"
                    label="Password"
                    disabled={disabledField}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            
                <TextField
                    label="Age"
                    disabled={disabledField}
                    value={age} />
                
                <TextField
                    label="Date of Birth"
                    disabled={disabledField}
                    value={birthDate} />

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