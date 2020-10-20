import React from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';

function Nav(props) {
  
  return (
    <nav>
      <Link to="/" ><h3 className={props.state.type ? "nav-link title" : "nav-link title about"}>Adoptr<FontAwesomeIcon className="paw" icon={faPaw} /></h3></Link>
      {props.state.type ? 
      <div className="nav-group">
        <p className="logged-user">Logged in as: {props.state.account.name}</p>
        <Button variant="outline-secondary" onClick={() => props.logout({})} className="logout-button">Logout</Button>
      </div> : <div className="nav-group">
        <Link to="/login" className="nav-link">User Login</Link>
        <Link to="/shelterlogin" className="nav-link">Shelter Login</Link>
      </div>}
    </nav>
  )
};

export default Nav;