import React from "react";
import { Redirect, Link } from "react-router-dom"

function ShelterLanding(props) {

  if (!props.state.type) {
    return <Redirect to="/" />
  } else if (props.state.type === "user") {
    return <Redirect to="/landing" />
  } else {
    return (
      <div>
        <h1>Hello Shelter {props.state.account.name}</h1>
        <Link to="/animals">Create New Animal Profile</Link>
        <Link to="/profiles">Profiles</Link>
      </div>
    )
  }

}

export default ShelterLanding;