import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from "react-router-dom"

function Dashboard(props) {
  const profiles = props.profiles;
  let profileCards = [];

  profiles.forEach(profile => {
    profileCards.push(
      <Card style={{ width: '18rem' }} key={profile._id}>
        <Card.Img variant="top" src={profile.animal_photos[0]} />
        <Card.Body>
          <Card.Title>{profile.name}</Card.Title>
          <Card.Text>
            {profile.bio}
          </Card.Text>
          {props.state.account.type === 'shelter' ? <Button variant="primary">See {profile.name}'s matches</Button> : <Link to={`/animal/profile/${profile._id}`}><Button variant="primary">See {profile.name}'s full profile</Button></Link>}
        </Card.Body>
      </Card >
    )
  })

  return profileCards;
}


export default Dashboard;