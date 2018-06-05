import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Card, CardTitle } from 'material-ui/Card'
import { Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import SectionContainer from './SectionContainer'
import CardContainer from '../components/CardContainer'
import ExerciseCard from '../components/ExerciseCard'

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
      liked:'',
      user: props.user,
      deleteDialogOpen: false,
      redirect: false,
    }
  }

  async componentDidMount () {
    let workout
    try {
      workout = await axios.get(`/api/workouts/${this.state.id}`)
    } catch (err) {
      console.log(err)
    }
 
    const { name, description, exercises, intensity, creator, liked } = workout.data
    this.setState({
      name,
      description,
      exercises,
      intensity,
      creator,
      liked
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
    return this.state.exercises.map(exercise =>{
      return(
        <ExerciseCard {...exercise} />  
      )
    })
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
   
  }

  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to="/workouts" />
    }
    return (
      // <MuiThemeProvider>
      //   <div className="main-container-workout">
      //     <Card className="column-container main-width ">
      //       <div className="flex-row flex-center main-blue">
      //         <div className="column-container title-desc tb-padding">
      //           <CardTitle className="no-padding" title={this.state.name} subtitle={`${this.state.description}`} />
      //             Like - {this.state.liked.length } - comments
      //           {this.renderAdminButtons()}
      //         </div>
      //       </div>
      //       <div>
      //         
      //       </div>
      //     </Card>
      //   </div>
      // </MuiThemeProvider>
      <SectionContainer>
        <CardContainer>
          {this.renderExercisesInWorkout()}
        </CardContainer>
      </SectionContainer>
    )
  }
}

export default WorkoutContainer
