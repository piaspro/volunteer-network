import React, { useContext, useEffect, useState } from 'react';
import './Home.css'
import { Container } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Header from '../Header/Header';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom';
import { userContext } from '../../App';




const Home = () => {
    const [projects, setProjects] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    useEffect(() => {
        fetch('http://localhost:5000/getProject')
        .then(res => res.json())
        .then(data => setProjects(data))
    },[projects])

    const handleProjects = (element) => {
        setLoggedInUser(element)
    }

    return (
        <div>
            <Header></Header>
            <Container className="mt-5" fluid="md">
                <div className="d-flex justify-content-center" >
                    <h1>I GROW BY HELPING PEOPLE IN NEED</h1>
                </div>
                <InputGroup  className="mt-3 mb-5 justify-content-lg-center">
                    <FormControl
                    placeholder="Search"
                    />
                    <InputGroup.Append>
                        <Button variant="primary">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Container>
            <Container>
                <Row>
                    {
                        projects.map( element => <Col>
                                                    <Card style={{ width: '15rem' }}>
                                                        <Card.Img variant="top" src={element.img} />
                                                        <Card.Body>
                                                            <Card.Text>
                                                            <Link to="/register"> <button onClick={() => handleProjects(element)} className="button">{element.project}</button></Link>
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>) 
                    }
                </Row>
            </Container>

        </div>
    );
};

export default Home;