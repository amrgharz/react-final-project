import React from 'react'
import {nav} from './Home'
import './Register.css'
import {Row , Grid , Col , Button } from 'react-bootstrap'


export default class Register extends React.Component{
    
    render(){
        return(
            <div id='log_in_container'>
            <Grid>
                <Row className='show-grid'>
                    <Col>   
            <nav/>
                <form action='post' method='POST' onSubmit=''>
                    <input className='username' type='text' placeholder='username' name='username'/>

                    <input className='email' type='text' placeholder='email' name='email'/>

                    <input className='password' placeholder='password' name='password'/>

                    <input className='confirm_passowrd' placeholder='confirm password' name='confirm_password' />

                    <Button className='submit' >Register</Button>
                </form>
                </Col>
                </Row>
                </Grid>
            </div>
        )
    }

}