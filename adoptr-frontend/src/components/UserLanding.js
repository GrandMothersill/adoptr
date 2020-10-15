import React from "react";
import { Redirect } from "react-router-dom"

function UserLanding(props) {

  if (!props.state.type) {
    return <Redirect to="/" />
  } else if (props.state.type === "shelter") {
    return <Redirect to="/shelterlanding" />
  } else {
    return (
      <h1>Hello User {props.state.account.name}</h1>
    )
  }
}

export default UserLanding;