import React from "react";
import { Redirect, Link } from "react-router-dom"
import "../styles/Landing.css";
import TinderSwipe from "./TinderSwipe";
import Button from 'react-bootstrap/Button';

function UserLanding(props) {

  if (!props.state.type) {
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
        </div>
        <TinderSwipe setUserMatches={props.setUserMatches} userMatches={props.userMatches} setNewMatch={props.setNewMatch} setRejectedAnimal={props.setRejectedAnimal} state={props.state} />
      </div>
    )
  }
}

export default UserLanding;