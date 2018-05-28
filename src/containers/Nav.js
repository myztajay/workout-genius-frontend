import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import { ToolbarGroup } from 'material-ui/Toolbar'
import './nav.css'
import FlatButton from 'material-ui/FlatButton'

const MyNavLinks = () => (
  <ToolbarGroup>
    <FlatButton 
      label="Create"
      labelStyle={{color: 'white', backgroundColor:'#2979FF', padding: '10px'}} 
      containerElement={<NavLink to="/workouts/new" />}
    />
  </ToolbarGroup>
);

class Nav extends Component{
  constructor(props) {
  super(props);
  this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open})
  handleClose = () => this.setState({open: false});

  render(){
    return(
      <MuiThemeProvider>
        <AppBar
        className='navbar'
        title={<span className='navbar-title'>Workout genius</span>}
        iconElementRight={<MyNavLinks />}
        onLeftIconButtonClick={this.handleToggle}
        >
        </AppBar>
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          containerStyle={{backgroundColor:'#ecf0f1',}}
        >
          <NavLink to="/"><MenuItem onClick={this.handleClose}>Home</MenuItem></NavLink>
          <NavLink to="/workouts"><MenuItem onClick={this.handleClose}>Workouts</MenuItem></NavLink>
          <NavLink to={`/profile/${this.props.user._id}`}><MenuItem onClick={this.handleClose}>Profile</MenuItem></NavLink>
          <MenuItem onClick={this.props.handleLogout}>Logout</MenuItem>
        </Drawer>
      </MuiThemeProvider>
    )
  }
}

export default Nav
