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
        <p>Edit your account, create new animal profiles and keep track of your animals and their matches all in one place!</p>
        <div className="dashboard-actions">
          <Link to="/user/edit"><Button variant="warning">Edit Account</Button></Link>
          <Button variant="warning" className="action">View Matches</Button>
        </div>
        <TinderSwipe setUserMatches={props.setUserMatches} userMatches={props.userMatches} setNewMatch={props.setNewMatch} setRejectedAnimal={props.setRejectedAnimal} state={props.state} />
      </div>
    )
  }
}

export default UserLanding;