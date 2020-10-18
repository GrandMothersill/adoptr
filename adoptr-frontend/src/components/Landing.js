import React from 'react';
import { Redirect } from "react-router-dom"
import "../styles/Landing.css";

function Landing(props) {

  if (props.state.type === "shelter") {
    return <Redirect to="/shelterlanding" />
  } else if (props.state.type === "user") {
    return <Redirect to="/landing" />
  } else {
    return (
      <div className="landing">
        <h1>Making "Adopt Don't Shop" Easy</h1>
        <p>Start viewing animals in you area! </p>
      </div>
    )
  }
}

export default Landing;