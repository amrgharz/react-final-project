import React from 'react'

import './Login.css'

import {withRouter} from 'react-router-dom'

import {Row , Grid , Col , Button } from 'react-bootstrap'

class Login extends React.Component{

    
  constructor (){
      super()
      this.state = {
          user_value:'',
          pass_value:'',
          username:'amrgharz',
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
        <div> 
            <Grid>
                <Row className='show-grid'>
                    <Col>   
                        <form>
           
                            <input className='username' placeholder='username' value = {this.state.user_value} name='user_value'  onChange={this.handle_username_change}/>

                            <input className='password' placeholder='Enter password' name='pass_value' value ={this.state.pass_value} onChange={this.handle_password_change}/>

                            <Button onClick={this.handle_log_in}>Log In</Button>
                        </form>
                    </Col>
                </Row>
            </Grid>
        </div>
        )
    }

}

export default withRouter (Login)