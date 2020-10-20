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
        <h1>Welcome to your dashboard, {props.state.account.name}</h1>
        <p>Edit your account, view your matches and swipe through animal profiles all in one place!</p>
        <div className="dashboard-actions">
          <Link to="/user/edit"><Button variant="warning" className="dashboard-actions">Edit Account</Button></Link>
          <Link to="/usermatches"><Button variant="warning" className="dashboard-actions action">View your matches</Button></Link>
        </div>
        <TinderSwipe setUserMatches={props.setUserMatches} userMatches={props.userMatches} setNewMatch={props.setNewMatch} setRejectedAnimal={props.setRejectedAnimal} state={props.state} />
      </div>
    )
  }
}

export default UserLanding;