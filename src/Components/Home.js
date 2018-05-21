import React from 'react';

import '../index.css'

import {Link} from 'react-router-dom';

import {withRouter} from 'react-router-dom'

import {Row , Grid , Col , Button } from 'react-bootstrap'

class Home extends React.Component {
    //Handle the register button 
    handleRegister = ()=>{
        this.props.history.push("/register");
    };
    //Handle the login button 
    handleLogin= () =>{
        this.props.history.push("/login");
    }
    render(){
        return(
        <div>
            <Grid fluid>
                <Row className='show-grid'>
                    <Col>  
                         <nav className = 'nav'>BITCHANGE 
                            <Link to='login' className='log_in'>Log in</Link>
                            <Link to='register' className='register'>Register</Link>
                            <Link to='about' className='about'>About</Link>
                        </nav>
                        <div className='background' >
                            <Button className='register_button' bsStyle="Success" bsSize='large' onClick={this.handleRegister}>Register</Button>
                            <Button className='log_in_button' bsStyle="Succeess" bsSize='large' onClick={this.handleLogin}>Log In</Button>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>
        )};  
}
export default withRouter(Home)