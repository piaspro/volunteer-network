import React, { useContext, useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import logo from '../../images/logos/Group 1329.png'
import { Col, Container, Media, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './EventTasks.css'
import { userContext } from '../../App';

const EventTasks = () => {
    const [userData, setUserData] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    // Date format
    const options = {  day: 'numeric', month: 'long',year: 'numeric' };
    // volunteer project of specific user
    useEffect(() => {
        fetch('http://localhost:5000/user?email='+loggedInUser.email, {
            method: 'GET',
            headers: { 
                'Content-Type' : 'application/json',
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setUserData(data))
    },[userData])
    // Delete project
    const deleteProject = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/deleteData/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    return (
        <Container fluid="md">
            <Navbar bg="transparent" expand="lg">
                <Navbar.Brand className="mr-auto justify-content-center" href="#home">
                    <img src={logo} height="50" className="d-inline-block align-top" alt="logo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/home" className="mr-4 link" >Home</Link>
                        <Link to="/register" className="mr-4 link" >Donation</Link>
                        <Link to="/eventTasks" className="mr-4 link" >Events</Link>
                        <Link to="/register" className="mr-4 link" >Blog</Link>
                    </Nav>
                        <h5 className="mt-2">{loggedInUser.name}</h5>
                </Navbar.Collapse>
            </Navbar>
            <Row>
                { userData.map(data => <Col>
                                            <Media className="m-3 p-3 d-sm-flex">
                                                <img width={200}  height={200} className="p-3 mr-1" src={data.img} alt="..." />
                                                <Media.Body className="p-3">
                                                    <h5>{data.project}</h5>
                                                    <h5>{(new Date(data.startDate).toLocaleDateString(undefined, options))}</h5>
                                                    <Button onClick={() => deleteProject(`${data._id}`)} className="mr-3 mt-5" variant="danger">Cancel</Button>
                                                </Media.Body>
                                            </Media>
                                        </Col>)
                }
            </Row>
        </Container>
    );
};

export default EventTasks;