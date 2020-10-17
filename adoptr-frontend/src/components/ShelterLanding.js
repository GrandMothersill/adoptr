import React from "react";
import { Redirect, Link } from "react-router-dom"
import "../styles/Landing.css";
import Dashboard from "./Dashboard";
import Button from 'react-bootstrap/Button';

function ShelterLanding(props) {
  // const [isLoading, setLoading] = useState(true);

  if (!props.state.type) {
    return <Redirect to="/" />
  } else if (props.state.type === "user") {
    return <Redirect to="/landing" />
  }

  return (
    <div className="landing">
      <h1>Welcome to your dashboard, {props.state.account.name}</h1>
      <p>Edit your account, create new animal profiles and keep track of your animals and their matches all in one place!</p>
      <div className="dashboard-actions">
        <Button variant="warning">Edit Account</Button>
        <Link to="/animals"><Button variant="warning" className="action">Create New Animal Profile</Button></Link>
      </div>
      {/* <Link to="/profiles">Profiles</Link> */}
      <div className="row dashboard"><Dashboard name={props.state.account.name} id={props.state.account._id} /></div>
    </div>
  )
}

export default ShelterLanding;