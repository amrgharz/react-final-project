import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from 'react-router-dom';
import Home from './Home';
//import Login from './Login';
//import Register from './Register'
import About from './About'
import Trade from './Trade'
import Blog from './Blog'
import Explore from './Explore';


const Routes = () => (
    <Router>
        <Switch>
            <Route exact path='/blog' component={Blog}/>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Home}/>
            <Route exact path='/explore' component={Explore}/>
            <Route exact path='/about' component={About}/>
            <Route exact path='/trade' component={Trade}/>
        </Switch>
    </Router>
  );
  export default Routes;