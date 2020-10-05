import React, { useContext, useState } from 'react';
import {Container} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logos/Group 1329.png'
import './Register.css'



const Register = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [startDate, setStartDate] = useState(new Date());
    let history = useHistory();
    // Send Data
    const sendData = () => {
        const description = document.getElementById('description').value;
        const {email, img, name, project} = loggedInUser
        const allInfo = {email, img, name, project, startDate, description};

        fetch('http://localhost:5000/addInfo', {
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(allInfo)
        })
        .then(res => res.json())
        .then(value => {
            if (value){
                history.push("/eventTasks");
            }else {
                alert("Registration Failed !!")
            }
        })
    }
    return (
        <div>
            <div className="img">
                <img src={logo} height="50" className="img" alt="logo" />
            </div>
            <Container fluid  className="d-flex justify-content-center">
                <div className="reg">
                    <h3>Register as a Volunteer</h3>
                    <input className="input" type="text" placeholder={loggedInUser.name} name={loggedInUser.name}/> <br/>
                    <input className="input" type="email" placeholder={loggedInUser.email} name={loggedInUser.email}/> <br/>
                    <DatePicker className="input" selected={startDate} onChange={date => setStartDate(date)} name="date"/> <br/>
                    <input className="input" id="description" type="text" placeholder="Description" name="Description" required/> <br/>
                    <input className="input" type="text" placeholder={loggedInUser.project} name={loggedInUser.project}/> <br/>
                    <button onClick={sendData} className="reg-btn" type="submit">Registration</button>
                </div>
            </Container>
        </div>
    );
};

export default Register;