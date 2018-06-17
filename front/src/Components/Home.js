import React from 'react'

import '../index.css'

//import {Link} from 'react-router-dom'

import io from 'socket.io-client'

import {withRouter} from 'react-router-dom'

import {Navbar ,Nav ,NavItem } from 'react-bootstrap'

//import { Col, Container, Row, Footer } from 'mdbreact';

import logo from '../logo.png'

import Footer from './Footer'

class Login extends React.Component{

    
  constructor (){
      super()
      this.state = {
          user_value:'',
          pass_value:'',
          socket:null,
          users: []
      }
          
   this.handle_log_in= this.handle_log_in.bind(this)   
   this.handle_username_change = this.handle_username_change.bind(this)
   this.handle_password_change = this.handle_password_change.bind(this)
  }
  componentDidMount(){
    const socket = io('http://localhost:3042')
    this.setState({ socket: socket }, () => {
        this.state.socket.emit('startLogin')
    }); 
    socket.on('startLogin', (users)=> {
      this.setState({users: users})    
  })
}

  handle_username_change = (event) =>{
    this.setState({[event.target.name]:event.target.value});
}

handle_password_change= (event) =>{
    this.setState({[event.target.name]:event.target.value});
}

  handle_log_in = () => {
    for (var i = 0; i < this.state.users.length; i++){
      if (this.state.users[i].useremail === this.state.user_value)
        if (this.state.users[i].password === this.state.pass_value)
          this.props.history.push("/trade", {Id: this.state.users[i].userId});
    }
  }
  
    render(){
        return(
        <div className='log_in_container'> 
        <Navbar inverse collapseOnSelect>
            <img src={logo} alt='logo'/> 
                    <Navbar.Header>
                      <Navbar.Brand  >
                        <a style={{color:"rgb(223, 218, 205)"}} href="/">BITCHANGE</a>
                      </Navbar.Brand>
                      <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                      <Nav pullRight>
                        <NavItem  eventKey={1}  href="/login">
                          <h4 style={{color:"rgb(223, 218, 205)" , lineHeight:"0px"}}>Log In</h4> 
                        </NavItem>
                        <NavItem eventKey={2} href="/Explore">
                            <h4 style={{color:"rgb(223, 218, 205)" , lineHeight:"0px"}}>Explore Markets</h4>
                        </NavItem>
                        <NavItem eventKey={3} href="/blog">
                            <h4 style={{color:"rgb(223, 218, 205)" , lineHeight:"0px"}}>Blog</h4>
                        </NavItem>
                        <NavItem eventKey={4} href="about">
                            <h4 style={{color:"rgb(223, 218, 205)" , lineHeight:"0px"}}>About</h4>
                        </NavItem>
                      </Nav>
                    </Navbar.Collapse>
        </Navbar>
                  <div class="login-wrap">
                  <div class="login-html">
                      <input id="tab-1" type="radio" name="tab" class="sign-in" checked/><label for="tab-1" class="tab" >Sign In</label>
                      <input id="tab-2" type="radio" name="tab" class="sign-up"/><label for="tab-2" class="tab">Sign Up</label>
              <div class="login-form">
                  <div class="sign-in-htm">
                      <div class="group">
                          <label for="user" class="label">Email</label>
                          <input id="user" name='user_value' type="text" class="input" value = {this.state.user_value } onChange={this.handle_username_change}/>
                      </div>
                      <div class="group">
                          <label for="pass" class="label">Password</label>
                          <input id="pass" name='pass_value'type="password" class="input" data-type="password" value={this.state.pass_value }onChange={this.handle_password_change}/>
                      </div>
                      <div class="group">
                          <input id="check" type="checkbox" class="check" checked/>
                          <label for="check"> <span class="icon"></span> Keep me Signed in</label>
                      </div>
                      <div class="group">
                          <input type="submit" class="button" value="Sign In" onClick={this.handle_log_in}/>
                      </div>
                      <div class="hr"></div>
                      <div class="foot-lnk">
                          <a href="#forgot">Forgot Password?</a>
                      </div>
                  </div>
                  <div class="sign-up-htm">
                      <div class="group">
                          <label for="user" class="label">Username</label>
                          <input id="user" type="text" class="input"/>
                      </div>
                      <div class="group">
                          <label for="pass" class="label">Password</label>
                          <input id="pass" type="password" class="input" data-type="password"/>
                      </div>
                      <div class="group">
                          <label for="pass" class="label">Repeat Password</label>
                          <input id="pass" type="password" class="input" data-type="password"/>
                      </div>
                      <div class="group">
                          <label for="pass" class="label">Email Address</label>
                          <input id="pass" type="text" class="input"/>
                      </div>
                      <div class="group">
                          <input type="submit" class="button" value="Sign Up"/>
                      </div>
                      <div class="hr"></div>
                      <div class="foot-lnk">
                          <label for="tab-1">Already Member?</label>
                      </div>
                  </div>
              </div>
          </div>
      
        </div>
        <Footer/>
        </div>
        )
    }

}

export default withRouter (Login)
