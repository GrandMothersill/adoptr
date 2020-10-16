import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "../styles/Landing.css";
import Dashboard from "./Dashboard";

function ShelterLanding(props) {
  // const [isLoading, setLoading] = useState(true);

  if (!props.state.type) {
    return <Redirect to="/" />
  } else if (props.state.type === "user") {
    return <Redirect to="/landing" />
  }

  return (
    <div className="landing">
      <h1>Welcome, {props.state.account.name}</h1>
      <Link to="/animals">Create New Animal Profile</Link>
      <Link to="/profiles">Profiles</Link>
      <div className="row"><Dashboard name={props.state.account.name} id={props.state.account._id} /></div>
    </div>
  )
}

export default ShelterLanding;