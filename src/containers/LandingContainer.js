import React, { Component } from 'react'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './landing.css'

class LandingContainer extends Component{
  logInWithFacebook(){
    window.location.href = '/api/auth/facebook' 
  }
  signUpWithFacebook(){
    window.location.href = '/api/auth/facebook' 
  }
  render(){
    return(
      <header>
      <div id="stripes"></div>
      <section className='intro'>
      <div className="intro-card">
      <MuiThemeProvider>
      <Card>
        <CardTitle title="Workout Genius" subtitle="Workout Genius" />
        <CardText>
          Find hundreds of workouts created by people like you. 
        </CardText>
        <CardActions>          
          <FlatButton label="Facebook Login" hoverColor='#1f4da5' labelStyle={{color:'white'}} backgroundColor='#365899'color='white' onClick={this.signUpWithFacebook} />  
          <FlatButton label="Sign up" hoverColor='#9df79b' backgroundColor= '#c8ffc4' onClick={this.signUpWithFacebook} />
        </CardActions>
      </Card>
      </MuiThemeProvider>
      </div>
      </section>
      </header>
      
    )
  }
}

export default LandingContainer

