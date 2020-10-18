import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import UserRegistration from "./components/UserRegistration.js";
import EditUser from "./components/EditUser.js";
import EditShelter from "./components/EditShelter.js";
import AnimalRegistration from "./components/AnimalRegistration.js";
import ShelterRegistration from "./components/ShelterRegistration.js";
import ShelterLogin from "./components/ShelterLogin";
import UserLanding from "./components/UserLanding";
import ShelterLanding from "./components/ShelterLanding";
import Nav from "./components/Nav";
import Landing from "./components/Landing"
import AnimalProfile from "./components/AnimalProfile"
import UserLogin from "./components/UserLogin"
import UserMatches from "./components/UserMatches";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useApplicationData from "./hooks/useApplicationData";



function App() {


  const { state, setUser, setShelter, logout, setRejectedAnimal, userMatches, setNewMatch, setUserMatches } = useApplicationData();


  return (
    <Router>
      <div className="App">
        <Nav logout={logout} state={state} />
        <Switch>
          <Route path='/profiles' exact component={AnimalProfile} />
          <Route path='/animals' render={() => <AnimalRegistration state={state} />} />
          <Route path='/users' render={() => <UserRegistration login={setUser} state={state} />} />
          <Route path='/user/edit' render={() => <EditUser login={setUser} state={state} />} />
          <Route path='/shelters' render={() => <ShelterRegistration login={setShelter} state={state} />} />
          <Route path='/shelter/edit' render={() => <EditShelter login={setShelter} state={state} />} />
          <Route path='/login' render={() => <UserLogin login={setUser} />} />
          <Route path='/shelterlogin' render={() => <ShelterLogin login={setShelter} />} />
          <Route path="/landing" render={() => <UserLanding setUserMatches={setUserMatches} userMatches={userMatches} setNewMatch={setNewMatch} setRejectedAnimal={setRejectedAnimal} state={state} />} />
          <Route path="/shelterlanding" render={() => <ShelterLanding state={state} />} />
          <Route path="/usermatches" render={() => <UserMatches state={state} />} />
          <Route path='/' render={() => <Landing state={state} />} />
        </Switch>
      </div>
    </Router>


  );
}

export default App;
