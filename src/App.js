import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Nav from './containers/Nav'
import LandingContainer from './containers/LandingContainer'
import '../node_modules/grommet-css';
import FeedContainer from './containers/FeedContainer'
import WorkoutsContainer from './containers/WorkoutsContainer'
import WorkoutContainer from './containers/WorkoutContainer'
import EditWorkoutContainer from './containers/EditWorkoutContainer'
import NewWorkoutContainer from './containers/NewWorkoutContainer'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: false,
      user: {},
    }
  }
  
  componentDidMount(){
    axios.get('/api/auth/userauth')
    .then((res)=>{
      if(res.data !== ''){
        this.setState({user: res.data, loggedIn: true})    
      }
    })  
    .catch((err)=>{console.log(err);})
    
    axios.get('/api/workouts')
    .then((res)=>{
      this.setState({workout: res.data})    
    })
    .catch((err)=>{console.log(err);})
  }
  
  handleLogout(){
    console.log("it happened");
    axios.get('/api/auth/logout')
    this.setState({
      loggedIn: false,
      user:{}
    })
  }
  
  render() {
    return (
      <BrowserRouter>
        <Switch>
        { !this.state.loggedIn 
        ?
        <Route exact path='/' component={LandingContainer} />
        :
        <div> 
        <Nav handleLogout={this.handleLogout.bind(this)}/>
        <div className='main-view'>
        <Route exact path='/' component={FeedContainer} />
        <Route exact path='/workouts' component={WorkoutsContainer}/>
        <Route exact path='/workouts/new' render={()=> <NewWorkoutContainer user={this.state.user} />} />
        <Route exact path='/workout/:workout' render={(props)=> <WorkoutContainer user={this.state.user}  {...props}/>} />
        <Route exact path='/workout/edit/:workout' render={(props)=> <EditWorkoutContainer user={this.state.user} {...props}/>} />
        </div>
        </div>
        }
        </Switch>
      </BrowserRouter>
    
    );
  }
}

export default App;
