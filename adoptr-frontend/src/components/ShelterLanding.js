import React, { useEffect, useState } from "react";
import axios from "axios"
import { Redirect, Link } from "react-router-dom"
import Dashboard from "./Dashboard";
import Button from 'react-bootstrap/Button';
import "../styles/Landing.css";

function ShelterLanding(props) {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/profiles/?id=${props.state.account._id}`)
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
        <div className="landing-dashboard-wrapper">
          <div>
            <h1 style={{ fontSize: '280%' }}> Welcome to your Dashboard, {props.state.account.name}</h1>
            <p className="dashboard-info">Edit your account, create new animal profiles and keep track of your animals and their matches all in one place!</p>
            <div className="dashboard-actions">
              <Link to="/animals"><Button variant="warning" className="dashboard-actions">Create New Animal Profile</Button></Link>
              <Link to="/shelter/edit"><Button variant="warning" className="dashboard-actions action">Edit Account</Button></Link>
            </div>
          </div>
        </div>
        <div className="row dashboard"><Dashboard className="shelter-landing-dashboard" profiles={profiles} type={props.state.type} /></div>
      </div>
    )
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}

export default ShelterLanding;