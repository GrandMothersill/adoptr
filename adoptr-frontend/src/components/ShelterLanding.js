import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "../styles/Landing.css";

function ShelterLanding(props) {
  const [isLoading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState();
  let profileCards = [];

  useEffect(() => {
    const id = props.state.account._id;
    const name = props.state.account.name;
    axios
    .get(`http://localhost:3001/profiles/?name=${name}&id=${id}`) 
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

  if (isLoading) {
    return (<div><p>Loading..</p></div>)
  } else {
    profiles.forEach(profile => {
      profileCards.push(
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={profile.animal_photos[0]} />
        <Card.Body>
          <Card.Title>{profile.name}</Card.Title>
          <Card.Text>
            {profile.bio}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      )
    })
  }
  return (
    <div className="landing">
      <h1>Welcome, {props.state.account.name}</h1>
      <Link to="/animals">Create New Animal Profile</Link>
      <Link to="/profiles">Profiles</Link>
      <div className="row">
        {profileCards}
      </div>
    </div>
  )
}

export default ShelterLanding;