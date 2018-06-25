import React, { Component } from 'react'
import Card from '../components/Card'
import SectionContainer from './SectionContainer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Divider from 'material-ui/Divider'
import IntensityRating from '../components/IntensityRating'
import Slider from 'react-slick'
import Blurb from '../components/Blurb'
import WorkoutCard from '../components/WorkoutCard'
import Button from '@material-ui/core/Button';
import './landingcontainer.css'
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import Pagination from '../vendor/components/Pagination'


const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);
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
        <WorkoutCard 
          paperElevation="8"
          className="card-workout" 
          {...workout}
        />
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
        <SectionContainer 
          color="#f3f3f3"
          customHeight="100vh"
          justifyContent='flexStart'
          backgroundImage="/m.jpg"
          >
          <Blurb grow='0' shrink='0' basis='50%' title='Hundreds of Workouts'
            sub='lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta ac nibh vitae congue. Phasellus in aliquam urna, sed porta ipsum. Quisque sagittis facilisis ante, nec ullamcorper ante accumsan id. '
          >
            <Button className='nav-button' style={{backgroundImage: `linear-gradient(150deg,#7CFF00 15%,#6FE400)`, color: '#222222'}} variant="raised" color="primary" size="medium">
              Start Working Out
            </Button>
          </Blurb>
        </SectionContainer>
        <SectionContainer
          color='white'
          customHeight="75vh"
          justifyContent='flex-start'
        >
          <BindKeyboardSwipeableViews enableMouseEvents index={this.state.exerciseIndex} >
            {this.renderLatest()}
          </BindKeyboardSwipeableViews>
          <Blurb grow='0' shrink='1' basis='50%' title='Alway up to date'
            sub='lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi porta ac nibh vitae congue. Phasellus in aliquam urna, sed porta ipsum. Quisque sagittis facilisis ante, nec ullamcorper ante accumsan id. '
          />  
        </SectionContainer>
        <SectionContainer
          color='white'
          flexDirection='column'
          customHeight="100vh"
          justifyContent='flex-start'
        >
        <Blurb grow='0' shrink='1' basis='50%' title='Show us what you got!'
            sub=''
          />  
          <div className="landing-card-container">
            <Card paperElevation="8" title="erwerwer" iconColor='red' bgColor='blue'/>
            <Card paperElevation="8" title="Calisthetics" iconColor='blue'/>
            <Card paperElevation="8" title="Bodybuilding" iconColor='yellow'/>
            <Card paperElevation="8" title="Aerobic"iconColor='orange'/>
            <Card paperElevation="8" title="Freestyle" iconColor='orange'/>
            <Card paperElevation="8" title="Etc"iconColor='orange'/>
          </div>
        </SectionContainer>

         <SectionContainer
          color='white'
          flexDirection='column'
          customHeight="100vh"
          justifyContent='flex-start'
        >
            <Blurb grow='0' shrink='1' basis='50%' 
            sub='Show us what you got!'
          />  
          <div className="conversion-card-container">
          <Card paperElevation="8" minHeight='400' title="We need you!" sub='Are you a beast? or Treadmill Tyrant? Well why not create your own work out? "Just do it" - Nike ' iconColor='orange'/>
          <Card paperElevation="8" minHeight='400' title="Or checkout our fresh sets" sub='Hundreds of worksout by the people for the people'iconColor='orange'/>
          </div>
          </SectionContainer>
      </header>
    )
  }
}

export default LandingContainer
