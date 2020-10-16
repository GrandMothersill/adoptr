import React from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "../styles/Landing.css";

function CardProfile() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  )
}

function ShelterLanding(props) {
  if (!props.state.type) {
    return <Redirect to="/" />
  } else if (props.state.type === "user") {
    return <Redirect to="/landing" />
  } else {
    return (
      <div className="landing">
        <h1>Welcome, {props.state.account.name}</h1>
        <Link to="/animals">Create New Animal Profile</Link>
        <Link to="/profiles">Profiles</Link>
      </div>
    )
  }

}

export default ShelterLanding;