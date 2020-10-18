import React from "react";
import { Redirect, Link } from "react-router-dom";
import TinderSwipe from "./TinderSwipe";

function UserLanding(props) {

  if (!props.state.type) {
    return <Redirect to="/" />
  } else if (props.state.type === "shelter") {
    return <Redirect to="/shelterlanding" />
  } else {
    return (
      <div>
        <h1>Hello User {props.state.account.name} and {props.state.account._id}</h1>
        <Link to="/usermatches">View your matches</Link>
        <TinderSwipe setUserMatches={props.setUserMatches} userMatches={props.userMatches} setNewMatch={props.setNewMatch} setRejectedAnimal={props.setRejectedAnimal} state={props.state} />
      </div>
    )
  }
}

export default UserLanding;