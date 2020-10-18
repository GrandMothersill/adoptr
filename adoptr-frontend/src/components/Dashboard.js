import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


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
        <Button variant="primary">See {profile.name}'s matches</Button>
      </Card.Body>
    </Card>
    )
  })

  return profileCards;
}


export default Dashboard;