import React, { createContext, useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LogIn from './Components/LogIn/LogIn';
import Register from './Components/Register/Register';
import Admin from './Components/Admin/Admin';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import EventTasks from './Components/EventTasks/EventTasks';
import AddEvent from './Components/AddEvent/AddEvent';

export const userContext = createContext();

function App() {
  
const [loggedInUser, setLoggedInUser] = useState ({});

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
          <Switch>
            <Route path="/home">
              <Home/>
            </Route>
            <Route path="/login">
              <LogIn/>
            </Route>
            <PrivateRoute path="/register">
              <Register/>
            </PrivateRoute>
            <PrivateRoute path="/admin">
              <Admin/>
            </PrivateRoute>
            <Route path="/addEvent">
              <AddEvent/>
            </Route>
            <PrivateRoute path="/eventTasks">
              <EventTasks/>
            </PrivateRoute>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
