import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'

function Nav(props) {
  return (
    <nav>
      <Link to="/" className="nav-link"><h3>Adoptr  <FontAwesomeIcon icon={faPaw} /></h3></Link>
      <Link to="/" className="nav-link">About</Link>
      <Link to="/users" className="nav-link">Create New User Profile</Link>
      <Link to="/shelters" className="nav-link">Create New Shelter Profile</Link>
      <Link to="/animals" className="nav-link">Create New Animal Profile</Link>
      <Link to="/profiles" className="nav-link">Profiles</Link>

      {props.state.user.first_name ? <p>Logged in as: {props.state.user.first_name}</p> : <Link to="/users" className="nav-link">Login</Link>}
      <button onClick={() => props.logout({})}>Logout</button>
    </nav>
  )
};

export default Nav;