import React, { useContext, useState } from 'react';
import {Container} from 'react-bootstrap';
import './Login.css'
import logo from '../../images/logos/Group 1329.png'
import google from '../../images/logos/google.png'
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const LogIn = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [user, setUser] = useState({
        name:'',
        googleError:''
    })

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    const googleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        
        firebase.auth().signInWithPopup(provider)
        .then( (result) => {
             // The signed-in user info.
             const {displayName, email}= result.user;
             const signedInUser = {
                 name: displayName,
                 email: email};
                 const userInfo = {...loggedInUser, ...signedInUser}
                 setLoggedInUser(userInfo);
                 storeAuthToken()
                 history.replace(from);
          }).catch(  (error) => { 
            const newInfo = {...user}
            newInfo.googleError = error.message;
            setUser(newInfo);
          });
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken( true)
        .then( (idToken) => {
            sessionStorage.setItem('token', idToken)
          }).catch( (error) => {
            // Handle error
            console.log(error)
          });
          
    }

    return (
        <div>
            <div className="img">
                <img src={logo} height="50" className="img" alt="logo" />
            </div>
            <Container fluid  className="d-flex justify-content-center">
                <div className="logIn">
                    <h2>Log In</h2>
                    <button onClick={googleSignIn} className="signIn"> <img className="icon mr-5" src={google} alt=''/> Sign In With google </button>
                    <h6>Don't Have a account?</h6>
                    <p className="warning">{user.googleError}</p>
                </div>
            </Container>
        </div>
    );
};

export default LogIn;