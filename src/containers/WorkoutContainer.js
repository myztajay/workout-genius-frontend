import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Card, CardTitle } from 'material-ui/Card'
import { Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton'
import DeleteDialog from '../components/DeleteDialog'
import './workoutcontainer.css'

class WorkoutContainer extends Component {
  constructor(props) {
    super(props)
    this.onDelete = this.onDelete.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.state = {
      id: props.match.params.workout,
      name: '',
      description: '',
      intensity: '',
      exercises: [],
      creator: [],
      user: props.user,
      deleteDialogOpen: false,
      redirect: false,
    }
  }

  async unsafe_componentwillmount () {
    let workout
    try {
      workout = await axios.get(`/api/workouts/${this.state.id}`)
    } catch (err) {
      console.log(err)
    }
    const {
      name, description, exercises, intensity, creator,
    } = workout.data
    this.setState({
      name,
      description,
      exercises,
      intensity,
      creator,
    })
  }

  onDelete = () => {
    this.setState({ deleteDialogOpen: false })
    if (this.state.user._id === this.state.creator[0]) {
      try {
        axios.delete(`/api/workouts/${this.state.id}`)
        this.setState({ redirect: true })
      } catch (err) {
        console.log(err)
      }
    }
  }

  handleDialogClose = () => {
    this.setState({ deleteDialogOpen: false })
  }

  renderExercisesInWorkout = () => {
    return this.state.exercises.map(exercise =>
      // THE JSX return should be refactored into own component when finalized
      (
        <Card className="card-margin exercise-card">
          <div className="column-container flex-flexible">
            <CardTitle title={exercise.name} titleColor="#2979FF" />
          </div>
          <div className="flex-row flex-flexible flex-end">
            <div className="circle flex-center text-white text-center">reps<br />
              {exercise.reps}
            </div>
            <div className="circle flex-center text-white text-center">sets<br />
              {exercise.sets}
            </div>
          </div>
        </Card>
      ))
  }

  renderAdminButtons = () => {
    if (this.state.user._id === this.state.creator[0]) {
      return (
        <p>
          <Link to={`edit/${this.state.id}`}>
            <RaisedButton
              label="Edit"
              primary
            />
          </Link>
          <RaisedButton
            label="Delete"
            secondary
            labelColor="white"
            onClick={() => this.setState({ deleteDialogOpen: true })}
          />
          <DeleteDialog
            deleteDialogOpen={this.state.deleteDialogOpen}
            onDelete={this.onDelete}
            handleDialogClose={this.handleDialogClose}
          />
        </p>
      )
    }
    return ''
  }

  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to="/workouts" />
    }
    return (
      <MuiThemeProvider>
        <div className="main-container-workout">
          <Card className="column-container main-width ">
            <div className="flex-row flex-center main-blue">
              <div className="column-container title-desc tb-padding">
                <CardTitle className="no-padding" title={this.state.name} subtitle={`${this.state.description}`} />
                  Likes - comments
                {this.renderAdminButtons()}
              </div>
            </div>
            <div>
              {this.renderExercisesInWorkout()}
            </div>
          </Card>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default WorkoutContainer
