import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import logo from '../../images/logos/Group 1329.png'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <Container fluid="md">
            <Navbar bg="transparent" expand="lg">
                <Navbar.Brand className="mr-auto justify-content-center" href="#home">
                    <img src={logo} height="50" className="d-inline-block align-top" alt="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/home" className="mr-4 link" >Home</Link>
                        <Link to="/eventTasks" className="mr-4 link" >Donation</Link>
                        <Link to="/eventTasks" className="mr-4 link" >Events</Link>
                        <Link to="/register" className="mr-4 link" >Blog</Link>
                    </Nav>
                        <Link to="/register"><Button className="mr-3" variant="primary">Register</Button></Link>
                        <Link to="/admin"><Button className="mr-3" variant="dark">Admin</Button></Link>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default Header;