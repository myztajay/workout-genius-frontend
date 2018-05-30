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
        Create you own workout with us  <NavLink to="/workouts/new"><RaisedButton label="Secondary" secondary label="create" /> </NavLink>
      </div>
      Check us out at <a href="https://github.com/myztajay/workout-genius-frontend"><FontAwesome name="github" /></a>
    </div>
  </MuiThemeProvider>
)

export default Footer
