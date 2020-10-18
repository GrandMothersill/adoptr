import React, { useEffect, useState } from "react";
import axios from "axios"
import { Redirect, Link } from "react-router-dom"
import "../styles/Landing.css";
import Dashboard from "./Dashboard";
import Button from 'react-bootstrap/Button';

function ShelterLanding(props) {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/profiles/?name=${props.state.account.name}&id=${props.state.account._id}`)
      .then((response) => {
        setProfiles(response.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      })
  }, []);



  if (!props.state.type) {
    return <Redirect to="/" />
  } else if (props.state.type === "user") {
    return <Redirect to="/landing" />
  }

  if (!loading) {
    return (
      <div className="landing">
        <h1>Welcome to your dashboard, {props.state.account.name} and {props.state.account._id}</h1>
        <p>Edit your account, create new animal profiles and keep track of your animals and their matches all in one place!</p>
        <div className="dashboard-actions">
          <Button variant="warning">Edit Account</Button>
          <Link to="/animals"><Button variant="warning" className="action">Create New Animal Profile</Button></Link>
        </div>
        <div className="row dashboard"><Dashboard profiles={profiles} /></div>
      </div>
    )
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}

export default ShelterLanding;