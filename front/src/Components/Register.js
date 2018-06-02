import React from 'react'
import './Register.css'
import { Col , Button , Form , FormGroup ,ControlLabel , FormControl , Checkbox } from 'react-bootstrap'

import {Link} from 'react-router-dom'
export default class Register extends React.Component{
    
    render(){
        return(
            <div className='register_container'>
            <nav className = 'nav'>
                            <Link to='/' className='bitchange'>BITCHANGE</Link> 
                            <Link to='login' className='log_in'>Log in</Link>
                            <Link to='register' className='register'>Register</Link>
                            <Link to='about' className='about'>About</Link>
                        </nav>
            
            <Form horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={4} className='email-padding'>
            Email
          </Col>
          <Col sm={4}>
            <FormControl type="email" placeholder="Email" name='user_value' />
          </Col>
        </FormGroup>
      
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={4} className='password-padding'>
            Password
          </Col>
          <Col sm={4}>
            <FormControl type="password" placeholder="Password" name='pass_value'/>
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={4}>
            Confirm Password
          </Col>
          <Col sm={4}>
            <FormControl type="password" placeholder="Confirm Password" name='pass_value'/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={8}>
            <Checkbox>Agree to Bitchange terms and condetions</Checkbox>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={8}>
            <Button bsStyle >Register</Button>
          </Col>
        </FormGroup>
      </Form>
        </div>
        )
    }

            

}