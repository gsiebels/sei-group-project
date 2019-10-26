import React from 'react'
import { Link, withRouter } from 'react-router-dom'
// import Auth from '../../lib/auth'


class Navbar extends React.Component {
  constructor() {
    super()

  }

  render() {
    return (
      <nav>
        <div className="logo-wrapper">
          <Link className="logo" to="/">🦄</Link>
        </div>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/cities">See all the cities</Link>
        <a>Logout</a>
      </nav>
    )
  }
}

export default withRouter(Navbar)