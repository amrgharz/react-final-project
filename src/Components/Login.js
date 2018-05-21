import React from 'react'

import './Login.css'

import {Row , Grid , Col , Button } from 'react-bootstrap'

export default class Login extends React.Component{

   /* handleauth = (e) =>{
        e.preventdefault();
        const username = e.target.username.value
        const password = e.target.password.value
        if (username === user & password === pass){
            console.log('hello from ur account')
        }
    }*/
    render(){
        return(
        <div> 
            <Grid>
                <Row className='show-grid'>
                    <Col>   
                        <form action='bla' method='POST'>
           
                            <input id='email' placeholder='Email address' name='username' />

                            <input id='password' placeholder='Enter password' name='password'/>

                            <Button >Log In</Button>
                        </form>
                    </Col>
                </Row>
            </Grid>
        </div>
        )
    }

}