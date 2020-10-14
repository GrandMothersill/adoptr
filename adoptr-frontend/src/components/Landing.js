import React from 'react';
import { Link } from "react-router-dom"

function Landing(props) {

  if (props.state.type === "shelter") {
    return (
      <div>
        <h1>Hello Shelter {props.state.account.name}</h1>
        <Link to="/animals">Create New Animal Profile</Link>
        <Link to="/profiles">Profiles</Link>
      </div>
    )
  } else if (props.state.type === "user") {
    return (
      <h1>Hello User {props.state.account.name}</h1>
    )
  } else {
    return (
      <h1>Landing Page</h1>
    )
  }

      // return (
      //   <h1>Landing Page</h1>
      // )
}

export default Landing;