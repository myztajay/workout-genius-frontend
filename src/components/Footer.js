import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import FontAwesome from 'react-fontawesome'
import { NavLink } from 'react-router-dom'
import './footer.css'

const Footer = () => (
  <MuiThemeProvider>
    <div className="footer">
      <div className="message">
        <ul className="footer-nav">
          <li> <NavLink to="/about/" className="footer-link"> About Us</NavLink></li>
          <li> <NavLink to="/about/" className="footer-link"> Privacy Policy</NavLink></li>
          <li> <NavLink to="/about/" className="footer-link"> Term and Conditions</NavLink></li>
          <li> <NavLink to="/about/" className="footer-link"> Payment Policy</NavLink></li>
          <li> <NavLink to="/about/" className="footer-link"> Contact</NavLink></li>
        </ul>
      </div>
      Check us out at <a href="https://github.com/myztajay/workout-genius-frontend"><FontAwesome name="github" /></a>
    </div>
  </MuiThemeProvider>
)

export default Footer
