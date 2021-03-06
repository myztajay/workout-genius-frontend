import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import 'typeface-roboto'
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
import AuthContainer from './containers/AuthContainer';

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
    if (authUser.data != false) {
      this.setState({ user: authUser.data, loggedIn: true })
    }
  }

  async handleLogout() {
    try { axios.get('/api/auth/logout') } catch (err) { console.log(err) }
    this.setState({
      loggedIn: false,
      user: {},
    })
  }

  logInWithFacebook() {
    window.location.href = '/api/auth/facebook'
  }
  signUpWithFacebook() {
    window.location.href = '/api/auth/facebook'
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
            <div>
              <Nav handleLogout={this.handleLogout} user={this.state.user} logInWithFacebook={this.logInWithFacebook} signUpWithFacebook={this.signUpWithFacebook} loggedIn={this.state.loggedIn}/>
              <Route exact path="/" render={() => !this.state.loggedIn ? <LandingContainer /> : <HomeContainer user={this.state.user} /> } />
              <Route exact path="/Login" render={() => !this.state.loggedIn ? <AuthContainer logInWithFacebook={this.logInWithFacebook}/> : <HomeContainer user={this.state.user} /> } />
              <Route exact path="/home" render={() => <HomeContainer user={this.state.user} />} />
              <Route exact path="/workouts" render={() => <WorkoutsContainer user={this.state.user} />} />
              <Route exact path="/workouts/new" render={() => <NewWorkoutContainer user={this.state.user} />} />
              <Route exact path="/workout/:workout" render={props => <WorkoutContainer user={this.state.user} {...props} />} />
              <Route exact path="/workout/edit/:workout" render={props => <EditWorkoutContainer user={this.state.user} {...props} />} />
              <Route exact path="/profile/:user" render={() => <ProfileContainer user={this.state.user} />} />
              <Footer />
            </div>
        </Switch>
      </BrowserRouter>

    )
  }
}

export default App
