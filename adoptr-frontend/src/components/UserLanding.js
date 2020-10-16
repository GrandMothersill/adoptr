import React from "react";
import { Redirect } from "react-router-dom"
import TinderSwipe from "./TinderSwipe";

function UserLanding(props) {

  if (!props.state.type) {
    return <Redirect to="/" />
  } else if (props.state.type === "shelter") {
    return <Redirect to="/shelterlanding" />
  } else {
    return (
      <div>
        <h1>Hello User {props.state.account.name}</h1>
        <TinderSwipe setRejectedAnimal={props.setRejectedAnimal} state={props.state} />
      </div>
    )
  }
}

export default UserLanding;