import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Nav from './containers/Nav'
import LandingContainer from './containers/LandingContainer'
import HomeContainer from './containers/HomeContainer'
import WorkoutsContainer from './containers/WorkoutsContainer'
import WorkoutContainer from './containers/WorkoutContainer'
import EditWorkoutContainer from './containers/EditWorkoutContainer'
import NewWorkoutContainer from './containers/NewWorkoutContainer'
import ProfileContainer from './containers/ProfileContainer'
import Footer from './components/Footer'
import '../node_modules/grommet-css'
import 'airbnb-browser-shims'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
    this.state = {
      loggedIn: false,
      user: {},
    }
  }

  async componentDidMount() {
    let authUser
    try {
      authUser = await axios.get('/api/auth/userauth')
    } catch (err) {
      console.log(err)
    }
    if (authUser.data !== '') {
      this.setState({ user: authUser.data, loggedIn: true })
    }
  }

  async handleLogout() {
    try { await axios.get('/api/auth/logout') } catch (err) { console.log(err) }
    this.setState({
      loggedIn: false,
      user: {},
    })
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          { !this.state.loggedIn
            ? <LandingContainer />
            :
            <div>
              <Nav handleLogout={this.handleLogout} user={this.state.user} />
              <Route exact path="/" render={() => <HomeContainer user={this.state.user} />} />
              <Route exact path="/workouts" render={() => <WorkoutsContainer user={this.state.user} />} />
              <Route exact path="/workouts/new" render={() => <NewWorkoutContainer user={this.state.user} />} />
              <Route exact path="/workout/:workout" render={props => <WorkoutContainer user={this.state.user} {...props} />} />
              <Route exact path="/workout/edit/:workout" render={props => <EditWorkoutContainer user={this.state.user} {...props} />} />
              <Route exact path="/profile/:user" render={() => <ProfileContainer user={this.state.user} />} />
              <Footer />
            </div>
          }
        </Switch>
      </BrowserRouter>

    )
  }
}

export default App
