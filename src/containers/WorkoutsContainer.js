import React, { Component } from 'react'
import { Card, CardTitle, CardMedia } from 'material-ui/Card'
import { WorkoutCard } from '../components/WorkoutCard'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Link } from 'react-router-dom'
import Divider from 'material-ui/Divider'
import axios from 'axios'
import './workoutscontainer.css'
import WorkoutFilter from '../components/WorkoutFilter'
import IntensityRating from '../components/IntensityRating'

class WorkoutsContainer extends Component {
  constructor(props) {
    super(props)
    this.OnLikeClick = this.OnLikeClick.bind(this)
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
    let filter
    let workoutsArr
    // lets us know if we are filtering by category
    this.state.filterArr.length < 1 ? filter = false : filter = true
    if (filter) {
      // filters only workouts that match the filter value in state
      workoutsArr = this.state.workouts.filter(workout => workout.workout_type === this.state.filterArr[0])
    } else {
      workoutsArr = this.state.workouts
    }
    if (workoutsArr < 1) {
      return (
        <Link to="workouts/new">
          <Card className="card-action">
            <CardTitle
              titleColor="#2979FF"
              title="Create a workout"
              subtitle="Got a killer workout? Share it with the world."
            />
            <div className="icon-container">
              <i className="material-icons">add_circle</i>
            </div>
          </Card>
        </Link>
      )
    }
    return workoutsArr.map(workout => (
      <WorkoutCard className="card-workout" {...workout} >
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
          <div className="info" onClick={this.OnLikeClick(workout)}>
            <h4>Like</h4>
            <p className="card-text">
              <h4><i className="material-icons material-iconz">favorite_border</i></h4>
            </p>
          </div>
        </div>
        <Divider />
        <div className="user-info"><img className="profile-img" alt="A workout" src={`${workout.creator[0].facebook_photo}`} />{workout.creator[0].display_name}</div>
      </WorkoutCard>
    ))
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="banner">
          <div className="inner">
            <h1 className="banner-text">Stay in Shape</h1>
            <h3 className="banner-text">with hundreds of workouts.</h3>
          </div>
        </div>
        <div className="filter-div">
          <div className="filter-title">Filter by:</div>
          <WorkoutFilter name="Crossfit" abrev="CF" type={1} active={this.state.filterArr[0]} onFilterToggle={this.onFilterToggle} />
          <WorkoutFilter name="Hybrid" abrev="H" type={2} active={this.state.filterArr[0]} onFilterToggle={this.onFilterToggle} />
          <WorkoutFilter name="BodyBuilding" abrev="BB" type={3} active={this.state.filterArr[0]} onFilterToggle={this.onFilterToggle} />
          <WorkoutFilter name="Calisthetics" abrev="CS" type={4} active={this.state.filterArr[0]} onFilterToggle={this.onFilterToggle} />
          <WorkoutFilter name="Cardio" abrev="CO" type={5} active={this.state.filterArr[0]} onFilterToggle={this.onFilterToggle} />
        </div>
        <div className="filter-results">{this.state.workoutCount} {this.state.workoutCount === 1 ? 'Workout found' : 'workouts found'}</div>
          <div className="card-section">
          <div className="card-container">
          {this.renderWorkouts()}
          </div>
          </div>
      
      </MuiThemeProvider>
    )
  }
}

export default WorkoutsContainer
