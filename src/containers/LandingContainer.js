import React, { Component } from 'react'
import { Card, CardActions, CardTitle, CardText, CardMedia  } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { GenSection } from '../components/GenSection'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

import { Link } from 'react-router-dom'
import Divider from 'material-ui/Divider'
import IntensityRating from '../components/IntensityRating'
import Slider from 'react-slick'

import './landingcontainer.css'


class LandingContainer extends Component {
  state = {
    workouts: [],
  }


  logInWithFacebook() {
    window.location.href = '/api/auth/facebook'
  }
  signUpWithFacebook() {
    window.location.href = '/api/auth/facebook'
  }
  async UNSAFE_componentWillMount() {
    try{  
      const workouts = await axios.get(`/api/workouts/`)
      this.setState({
        workouts: workouts.data,
      })
    } catch (err) {
      console.log(err)
    }
  }

  renderLatest() {
    return this.state.workouts.map((workout)=>{
      return(
        <MuiThemeProvider>
        <Card className="card-workout">
        <CardTitle titleColor="#2979FF" />
        <Link key={workout._id} to={`/workout/${workout._id}`} >
          <CardMedia overlay={<CardTitle title={workout.name} subtitle={workout.description} />} >
            <img className="workout-img" src="workout.jpeg" alt="" />
          </CardMedia>
        </Link>
        <div className="card-info">
          <div className="info"><h4>Exercises</h4><p className="card-text">{workout.exercises.length}</p></div>
          <div className="info"><h4>Intensity</h4><p className="card-text"><IntensityRating intensity={workout.intensity} /></p></div>
          <div className="info"><h4>Likes</h4><p className="card-text">{workout.liked.length}</p></div>
          <div className="info" >
            <h4>Like</h4>
            <p className="card-text">
              <h4><i className="material-icons material-iconz">favorite_border</i></h4>
            </p>
          </div>
        </div>
        <Divider />
        <div className="user-info"><img className="profile-img" alt="A workout" src={`${workout.creator[0].facebook_photo}`} />{workout.creator[0].display_name}</div>
      </Card>
      </MuiThemeProvider>
      )
    })
  }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    
    return (
      <header>
        <section className="intro">
          <div className="main-section hero-height">
            <Typography className='brand hero-pad' variant='display2' color="inherit" >
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta ac nibh vitae congue. Phasellus in aliquam urna, sed porta ipsum. Quisque sagittis facilisis ante, nec ullamcorper ante accumsan id. 
            </Typography >  
          </div>
        </section>
        <section className="main-section">
          <Typography className='brand self-center title-pad' variant='display2' color="inherit" >
          Recently Added
          </Typography >
          <Typography className='brand self-center lr-pad' variant='display4' color="inherit" >
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta ac nibh vitae congue. Phasellus in aliquam urna, sed porta ipsum. Quisque sagittis facilisis ante, nec ullamcorper ante accumsan id. 
          </Typography >    
       
          <Slider {...settings}>
            {this.renderLatest()}
          </Slider>
       
          
        </section>
        <section className="main-section">
        <Typography className='brand self-center title-pad' variant='display2' color="inherit" >
          Workouts for everyone!
          </Typography >
          <div className="landing-card-container">
            <div className="landing-card"></div>
            <div className="landing-card"></div>
            <div className="landing-card"></div>
            <div className="landing-card"></div>
            <div className="landing-card"></div>
            <div className="landing-card"></div>
          </div>
        </section>
        <section className="main-section">
          <Typography className='brand self-center title-pad' variant='display2' color="inherit" >
                Get Involved!
          </Typography >
          <div className="conversion-card-container">
            <div className="conversion-card">
              <Typography className='brand self-center title-pad' variant='display2' color="inherit" >
                contribute!
              </Typography >
            </div>
            <div className="conversion-card">
              <Typography className='brand self-center title-pad' variant='display2' color="inherit" >
                contribute!
              </Typography >
            </div>
          </div>
        </section>
      </header>
    )
  }
}

export default LandingContainer
