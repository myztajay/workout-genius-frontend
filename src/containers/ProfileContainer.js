// eslint-disable-next-line 
import React, { Component } from 'react'
import { Card } from 'material-ui/Card'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './profilecontainer.css'

class ProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
    }
  }

  renderLiked = () => {
    return this.state.user.liked.map(workout => (<h1>flang</h1>))
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="profile-container">
          <div className="banner2">
            <div className="photo-container">
              <img className="rounded" alt="profile" src={`${this.state.user.facebook_photo}`} />
            </div>
            <div className="quote-container">
              <h1>Quote Quote Quote</h1>
            </div>
          </div>
          <Card className="card-width">
            <div className="card-container">
              <div>{this.renderLiked()}</div>
              <div><h1>Workouts created</h1></div>
            </div>
          </Card>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default ProfileContainer
