import React from 'react'

import './Login.css'

import {Link} from 'react-router-dom'

import {withRouter} from 'react-router-dom'

import {Form ,FormGroup , ControlLabel, FormControl , Checkbox,  Col , Button } from 'react-bootstrap'

class Login extends React.Component{

    
  constructor (){
      super()
      this.state = {
          user_value:'',
          pass_value:'',
          username:'amr.gharz@gmail.com',
          password:'12345'
    
      }
          
   this.handle_log_in= this.handle_log_in.bind(this)   
   this.handle_username_change = this.handle_username_change.bind(this)
   this.handle_password_change = this.handle_password_change.bind(this)
  }

  handle_username_change = (event) =>{
    this.setState({[event.target.name]:event.target.value});
}

handle_password_change= (event) =>{
    this.setState({[event.target.name]:event.target.value});
}

  handle_log_in = ()=>{
    if(this.state.user_value === this.state.username && this.state.pass_value === this.state.password){
               this.props.history.push("/trade");
        } }
  
    render(){
        return(
        <div className='log_in_container'> 
        <nav className = 'nav'>
                            <Link to='/' className='bitchange'>BITCHANGE</Link> 
                            <Link to='login' className='log_in'>Log in</Link>
                            <Link to='register' className='register'>Register</Link>
                            <Link to='about' className='about'>About</Link>
                        </nav>
        <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={4}>
            Email
          </Col>
          <Col sm={4}>
            <FormControl type="email" placeholder="Email" value = {this.state.user_value} name='user_value'  onChange={this.handle_username_change}/>
          </Col>
        </FormGroup>
      
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={4}>
            Password
          </Col>
          <Col sm={4}>
            <FormControl type="password" placeholder="Password" name='pass_value' value ={this.state.pass_value} onChange={this.handle_password_change}/>
          </Col>
        </FormGroup>
      
        <FormGroup>
          <Col smOffset={2} sm={8}>
            <Checkbox>Remember me</Checkbox>
          </Col>
        </FormGroup>
      
        <FormGroup>
          <Col smOffset={2} sm={8}>
            <Button bsStyle type="submit" onClick={this.handle_log_in}>Sign in</Button>
          </Col>
        </FormGroup>
      </Form>
        </div>
        )
    }

}

export default withRouter (Login)
