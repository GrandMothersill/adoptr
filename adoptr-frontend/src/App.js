import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import UserRegistration from "./components/userRegistration.js";
import AnimalRegistration from "./components/animalRegistration.js";
import ShelterRegistration from "./components/shelterRegistration.js";
import Login from "./components/ShelterLogin";
import Nav from "./components/Nav";
import Landing from "./components/Landing"
import AnimalProfile from "./components/AnimalProfile"
import UserLogin from "./components/UserLogin"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useApplicationData from "./hooks/useApplicationData";



function App() {


  const { state, setUser, setShelter, logout } = useApplicationData();


  return (
    <Router>
      <div className="App">
        <Nav logout={logout} state={state} />
        <Switch>
          <Route path='/profiles' exact component={AnimalProfile} />
          <Route path='/animals' exact component={AnimalRegistration} />
          <Route path='/users' render={() => <UserRegistration login={setUser} state={state} />} />
          <Route path='/shelters' render={() => <ShelterRegistration login={setShelter} state={state} />} />
          <Route path='/login' render={() => <UserLogin login={setUser} />} />
          <Route path='/shelterlogin' render={() => <Login login={setShelter} />} />
          <Route path='/' render={() => <Landing state={state} />}  />
        </Switch>
      </div>
    </Router>


  );
}

export default App;
