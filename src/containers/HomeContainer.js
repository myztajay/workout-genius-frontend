import React from 'react'
import { Card, CardTitle } from 'material-ui/Card'
import propTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Link } from 'react-router-dom'
import './homecontainer.css'

export const HomeContainer = ({ user }) => {
  HomeContainer.propTypes = {
    user: propTypes.Shape,
  }

  return (
    <MuiThemeProvider>
      <div className="banner2">
        <div className="inner">
          <h1 className="banner-text"> Lets Get Started!</h1>
        </div>
      </div>
      <div className="main-container2">
        <Link to="/workouts">
          <Card className="card-actions">
            <div>
              <CardTitle
                titleColor="#2979FF"
                title="Browse Workouts"
                subtitle="Thousand of workouts made by people like you #homebrew"
              />
            </div>
            <div className="icon-container">
              <i className="material-icons">fitness_center</i>
            </div>
          </Card>
        </Link>
        <Link to="/workouts/new">
          <Card className="card-actions">
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
        <Link to={`/profile/${user._id}`}>
          <Card className="card-actions">
            <CardTitle
              titleColor="#2979FF"
              title="Profile"
              subtitle="Change your profile and show everyone the new you"
            />
            <div className="icon-container">
              <i className="material-icons">person</i>
            </div>
          </Card>
        </Link>
      </div>
    </MuiThemeProvider>
  )
}

export default HomeContainer
