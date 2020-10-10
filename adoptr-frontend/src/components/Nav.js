import React from "react"
import { Link } from "react-router-dom"

function Nav() {
  return (
    <nav>
      <Link to="/" className="nav-link"><h3>Logo</h3></Link>
      <Link to="/" className="nav-link">About</Link>
      <Link to="/animals" className="nav-link">Create New Animal Profile</Link>
      <Link to="/users" className="nav-link">Create New User Profile</Link>
      <Link to="/profiles" className="nav-link">Profiles</Link>
    </nav>
  )
}

export default Nav;