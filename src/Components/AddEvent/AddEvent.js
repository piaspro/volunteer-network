import React, { useState } from 'react';
import { Button, Col, Container, Form, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../images/logos/Group 1329.png'
import users from '../../images/logos/users-alt 1.png'
import plus from '../../images/logos/plus 1.png'
import DatePicker from 'react-datepicker';
import './AddEvent.css'

const AddEvent = () => {
    let history = useHistory();

    const [startDate, setStartDate] = useState(new Date());
    const sendData = () => {
        const description = document.getElementById('description').value;
        const project = document.getElementById('project').value;
        const allData = {startDate, project, description}
        console.log(allData)
        fetch('http://localhost:5000/addProject', {
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(allData)
        })
        .then(res => res.json())
        .then(value => {
           if (value){
            history.push("/home");
           }else{
               alert("Could Not Add !!")
           }
        })
    }
    return (
        <Container className="mt-3" fluid="md">
            <div className="container">
                <div className="row">
                    <div className="col-3 mr-3">
                        <Navbar.Brand className="mr-auto justify-content-center" href="#home">
                            <img src={logo} height="50" className="d-inline-block align-top" alt="logo" />
                        </Navbar.Brand>
                        <div className="mt-5">
                            <div className="mt-3">
                                <Link  to='/admin'> <img src={users} height="20" className="d-inline-block align-top" alt="logo" /> Volunteer Register List</Link>
                            </div>
                            <div className="mt-3">
                                <Link  to='/addEvent'> <img src={plus} height="20" className="d-inline-block align-top" alt="logo" /> Add Event</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-8 mt-3">
                        <div>
                            <h4>Add Event</h4>
                        </div>
                        <div className="body mt-3">
                            <Form className="formBody p-3">
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Event Title</Form.Label>
                                    <Form.Control id="project" type="text" placeholder="Event Title" name="project"/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Event Date</Form.Label> <br/>
                                    <DatePicker className="datePicker pr-5 pl-2" selected={startDate} onChange={date => setStartDate(date)} name="date"/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control id="description" as="textarea" rows={3} placeholder="Enter Description" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.File className="ml-3" id="exampleFormControlFile1" label="Banner" />
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                            <Link to="/home"><Button onClick={sendData} className="mt-3" variant="primary">Submit</Button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AddEvent;