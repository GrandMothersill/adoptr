import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Redirect, Link } from "react-router-dom"
import "../styles/Dashboard.css";

function Dashboard(props) {
  const profiles = props.profiles;
  let profileCards = [];

  profiles.forEach(profile => {
    profileCards.push(
      <Card style={{ width: '22rem', height: '40rem', color: props.className ? 'purple' : 'default' }} key={profile._id} >
        <Card.Img style={{ height: '20rem', maxHeight: 'initial', maxWidth: 'initial' }} variant="top" src={profile.animal_photos[0]} />
        <Card.Body>
          <div>
            <Card.Title>{profile.name}</Card.Title>
            {props.type === 'shelter' ? <Link to={`/animal/matches/${profile._id}/${profile.name}`}><Button variant="primary">See {profile.name}'s matches</Button></Link> : <Link to={`/animal/profile/${profile._id}`}><Button variant="primary">See {profile.name}'s full profile</Button></Link>}
          </div>
          <Card.Text>
            {profile.bio}
          </Card.Text>
        </Card.Body>
      </Card >
    )
  })

  return profileCards;
}


export default Dashboard;