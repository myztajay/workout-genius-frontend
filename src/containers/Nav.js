// eslint-disable-next-line 
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Button from '@material-ui/core/Button';
import Media from "react-media";
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './nav.css'

class Nav extends Component{
  // internal state and event handlers
  state = {
    open: false,
  };
  handleToggle = () => this.setState({open: !this.state.open})
  handleClose = () => this.setState({open: false});

  render(){
    return(
      <div>
        <div className='flex-nav'>
          <div>
          <Typography className='brand' variant='display2' color="inherit" >
            Workout Genius
          </Typography >  
          </div>
          <div className="flex v-center">
            <Media query="(min-width: 599px)">
            {matches =>
              matches && !this.props.loggedIn ? (
                <div>
                <Button className='nav-button' onClick={this.props.signUpWithFacebook}variant="raised" color="primary" size="medium">
                Sign Up
                </Button>
                <NavLink to='/api/auth/facebook'>or Login</NavLink>
                </div>
              ) : (
                ''
              )
            }
            </Media>
            <IconButton className="menu-button" onClick={this.handleToggle} >
              <MenuIcon className="icon-size" />
            </IconButton> 
          </div>  
        </div>
        <MuiThemeProvider>
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
            containerStyle={{backgroundColor:'#ecf0f1',}}
          >
            <NavLink to="/"><MenuItem onClick={this.handleClose}>Home</MenuItem></NavLink>
            <NavLink to="/workouts"><MenuItem onClick={this.handleClose}>Workouts</MenuItem></NavLink>
            {this.props.loggedIn ?<NavLink to={`/profile/${this.props.user._id}`}><MenuItem onClick={this.handleClose}>Profile</MenuItem></NavLink> : ''}
            {this.props.loggedIn ?<MenuItem onClick={this.props.handleLogout}>Logout</MenuItem> :''}
          </Drawer>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Nav
