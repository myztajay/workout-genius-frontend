import React, { Component } from 'react'
import { Card, CardTitle, CardMedia } from 'material-ui/Card'
import { WorkoutCard } from '../components/WorkoutCard'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Link } from 'react-router-dom'
import Divider from 'material-ui/Divider'
import axios from 'axios'
import './workoutscontainer.css'
import WorkoutFilter from '../components/WorkoutFilter'

import SectionContainer from './SectionContainer'
import CardContainer from '../components/CardContainer'
import PlayModal from '../components/PlayModal'


class WorkoutsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workouts: [],
      filterArr: [],
      workoutCount: null,
      user: props.user,
    }
  }

  async componentDidMount() {
    try {
      const workouts = await axios.get('/api/workouts')
      this.setState({
        workouts: workouts.data,
        workoutCount: workouts.data.length,
      })
    } catch (err) {
      console.log(err)
    }
  }

  onFilterToggle = (type) => {
    if (this.state.filterArr.length === 0 || this.state.filterArr[0] !== type) {
      this.setState({
        filterArr: [type],
        workoutCount: this.state.workouts.filter(workout => workout.workout_type === type).length,
      })
    } else {
      this.setState({
        filterArr: [],
        workoutCount: this.state.workouts.length,
      })
    }
  }



  OnLikeClick = (workout) => {
    const likeCheck = workout.liked.some((userThatLiked) => {
      if (String(this.state.user._id) === String(userThatLiked._id)) return true
    })
    if (!likeCheck) {
      workout.liked = [...workout.liked, this.state.user]
      axios.put(
        `/api/workouts/${workout._id}`,
        workout,
      )
    }
  }

  renderWorkouts = () => {
    return this.state.workouts.map(workout => (
      [
        <WorkoutCard 
          className="card-workout" 
          {...workout}
        />
      ]  
    ))
  }

  render() {
    return (
      [
      <SectionContainer title="Stay in Shape" backgroundImage='./k.jpg'subTitle="With Hundreds of Workouts" customHeight="60vh"/>,
      <SectionContainer>
        <CardContainer>
          {this.renderWorkouts()}
        </CardContainer>
      </SectionContainer>
      ]
    )
  }
}

export default WorkoutsContainer
