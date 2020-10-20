import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom"
import "../styles/Landing.css";
import TinderSwipe from "./TinderSwipe";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function UserLanding(props) {

  const [toggle, settoggle] = useState(false);

  const handleRejectionReset = (userID) => {

    console.log("WOO")
    axios
      .put(`http://localhost:3001/users/reject/reset`, { userID: userID })
      .then((response) => {
        console.log("RESET", response);
        settoggle(!toggle)
      })
      .catch((err) => {
        alert(err);
      });

    props.resetRejectedAnimal();
  };



  if (toggle || !props.state.type) {
    return <Redirect to="/" />
  } else if (props.state.type === "shelter") {
    return <Redirect to="/shelterlanding" />
  } else {
    return (
      <div className="landing">
        <h1>Welcome, {props.state.account.name}</h1>
        <div className="dashboard-actions">
          <Link to="/user/edit"><Button variant="warning">Edit Account</Button></Link>
          <Link to="/usermatches"><Button variant="warning" className="action">View your matches</Button></Link>
          <Button onClick={() => handleRejectionReset(props.state.account._id)} variant="warning" className="action">Bring Back Rejected Animals</Button>
        </div>
        <TinderSwipe setUserMatches={props.setUserMatches} userMatches={props.userMatches} setNewMatch={props.setNewMatch} setRejectedAnimal={props.setRejectedAnimal} state={props.state} />
      </div>
    )
  }
}

export default UserLanding;