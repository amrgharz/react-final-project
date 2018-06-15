import React from 'react';

import './Trade.css'

import io from 'socket.io-client'

import TradingViewWidget from 'react-tradingview-widget';
    
import {Link} from 'react-router-dom' 

import {Button} from 'react-bootstrap';

import logo from '../logo.png'


export default class Trading extends React.Component{
    constructor(){
        super();
        this.state = {
            min:0,
            max: '',
            x_amount:'',
            y_amount:'',
            socket:null,
            price: '',
            amount: '',
            sum: '',
            buy_orders_list : [],
            sell_price: '',
            sell_amount: '',
            sell_sum: '',
            sell_orders_list : [],
            userId: -1
        }
     this.handlePriceChange= this.handlePriceChange.bind(this)
     this.handleAmountChange= this.handleAmountChange.bind(this)
     //this.handlePriceChange_sell = this.handlePriceChange_sell.bind(this)
     //this.handleAmountChange_sell = this.handleAmountChange_sell.bind(this) 
     this.handleSubmit_buy = this.handleSubmit_buy.bind(this)
     this.handleSubmit_sell = this.handleSubmit_sell.bind(this)

     this.getTotal_buy = this.getTotal_buy.bind(this)  

    }
    
    getTotal_buy = (amount , price) =>{
        return amount * price;
    }
    getTotal_sell = (sell_amount , sell_price) =>{
        return sell_amount * sell_price;
    }
    handlePriceChange(event){
        
        this.setState({ [event.target.name]: event.target.value });
    }
    
    handleAmountChange = (event) => {

        this.setState({ [event.target.name]: event.target.value });
    }

    
    handleSubmit_buy(event){
        event.preventDefault();
        const order = {
            amount: parseInt(this.state.amount , 10),
            price: parseInt(this.state.price , 10),
            sum: parseInt(event.target.sum.value, 10)
        }
        const isInvalid = (num) => !num || num <= 0 || isNaN(num)
        if(isInvalid(order.amount) || isInvalid(order.price) || isInvalid(order.sum)){

            alert('one of the fields is invalid')
            return;
        }
        if(order.sum > this.state.y_amount){
            alert("oops you do not have enough money")
            return
        }
        //const final_y_amount = this.state.y_amount - order.sum
        //var stateCopy = Object.assign({},this.state);
        //stateCopy.y_amount = final_y_amount;
        //const final_x_amount = this.state.x_amount + order.amount
        //var stateCopy_x = Object.assign({},this.state);
        //stateCopy_x.x_amount = final_x_amount;
        //this.setState(stateCopy)
        //this.setState(stateCopy_x)
        this.state.socket.emit('add:order' , order)
        this.state.socket.emit('check:sell' , order, this.state.userId)
    };
    

    handleSubmit_sell(event){
        event.preventDefault();
        const sell_order ={
            sell_amount: parseInt(this.state.sell_amount , 10),
            sell_price : parseInt(this.state.sell_price, 10 ),
            sell_sum : parseInt(event.target.sell_sum.value, 10 )
        }
        const isInvalid = (num) => !num || num<=0 || isNaN(num)
        
        if(isInvalid (sell_order.sell_amount) || isInvalid(sell_order.sell_price) ||  isInvalid(sell_order.sell_sum)){
            alert('full the fields correctly')
            return;
        }
        if(sell_order.sell_amount > this.state.x_amount ){
            alert('you don\'t have enough X')
            return
        }
        //const final_amount = this.state.x_amount - sell_order.sell_amount
        //const final_y_amount = this.state.user.y_amount + sell_order.sell_sum
        //var stateCopy = Object.assign({},this.state);
        //stateCopy.x_amount = final_amount;
        //var stateCopy_y = Object.assign({},this.state);
        //stateCopy_y.user.y_amount = final_y_amount;
        //this.setState(stateCopy)
        this.state.socket.emit('add:sell_order' , sell_order)
        this.state.socket.emit('check:buy' , sell_order, this.state.userId)
    }

    

    componentDidMount(){
        const socket = io('http://localhost:3042')
        this.setState({ socket: socket }, () => {
            this.setState({ userId: this.props.location.state.Id }, () => {
                this.state.socket.emit('start', this.state.userId)
            })
        }); 
        socket.on('add:order' ,buy_orders_list=>{
            this.setState({buy_orders_list})
        })

        socket.on('add:sell_order' , sell_orders_list =>{
            this.setState({sell_orders_list})
        })
        socket.on('buy_orders:change' ,(buy_orders_list =>{
            this.setState({buy_orders_list})
        }))
        socket.on('check:sell', (buy_orders_list, sell_orders_list) => {
            this.setState({buy_orders_list, sell_orders_list })
        })
        socket.on('check:y_amount', (y_amount , x_amount) => {
            this.setState({y_amount , x_amount })
        })
        socket.on('check:x_amount' , (x_amount , y_amount)  =>{
            this.setState({x_amount , y_amount})
        })
        socket.on('check:buy', (buy_orders_list, sell_orders_list , x_amount) => {
            this.setState({buy_orders_list, sell_orders_list , x_amount})
        })
        socket.on('start', (buy_orders_list, sell_orders_list , x_amount , y_amount)=> {
            console.log(x_amount + " " + y_amount)
            this.setState({buy_orders_list, sell_orders_list , x_amount , y_amount  })    
        })
    }

    
    
    render(){
        return(
            <div id="container">
            <nav className = 'trade_nav'>
                <img src={logo}/>
                            <Link to='/' className='bitchange'>BITCHANGE</Link> 
                            <Link to='/' className='log_out'>Log Out</Link>
                            <Link to='about' className='about'>About</Link>
                        </nav>
                <div className="chart">
                    <TradingViewWidget autosize symbol="BTCUSD" />
                </div>
                <div className="buy_orders">
                    <table className='table' id='buy_table'>
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.buy_orders_list
                            .sort((a, b) => a.price > b.price)
                            .map((item, i) => {
                            return [
                                <tr key={i}>
                                  <td>{item.amount}</td>
                                  <td>{item.price}</td>
                                  <td>{item.sum}</td>
                                </tr>
                            ];
                          })}
                        </tbody>
                    </table>
                </div>
                <div className="sell_orders">
                   <table className='table' id='sell_table'>
                          <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.sell_orders_list.sort((a,b)=>a.sell_price<b.sell_price)
                            .map((item , i)=>{
                                return [
                                    <tr key={i}>
                                        <td>{item.sell_amount}</td>
                                        <td>{item.sell_price}</td>
                                        <td>{item.sell_sum}</td>
                                    </tr>
                                ]
                            }
                        )
                            }
                          </tbody>
                    </table>
                </div>
                <div className='Place_buy_order'>
                    <form name='buyform' onSubmit = {this.handleSubmit_buy} className='buy_form'>
                        <div className='orders_form_head'><strong>Buy USD ||  </strong>{`You have : ${this.state.y_amount}  Bitcoin`}</div><br/>
                            
                        <label for="amount_of_x">USD:</label>
                        <input type='number' name='amount' className="form-control" value = {this.state.amount} onChange={this.handleAmountChange} /><br/>
                    
                        <label for='price' className='buy_price'>Price:</label>
                        <input type='text' name='price' className="form-control" value = {this.state.price} onChange={this.handlePriceChange} /><br/>

                        <label for='total_price'>Total Price:</label>
                        <input type='text' name='sum' className="form-control" value = {this.getTotal_buy(this.state.amount, this.state.price)} disabled  /><br/>
                        <Button bsStyle="success" type='submit' className='buy_button'>BUY USD</Button>
                
                    </form>
                </div>
                <div className='Place_sell_order'>
                    <form name='sellform' onSubmit={this.handleSubmit_sell} className='sell_form' >
                    <div> <strong>Sell USD  ||  </strong>{`You have : ${this.state.x_amount} USD`}</div><br/>
                    <lable fore='Amount of X'>BTC:</lable>
                    <input type='number' name='sell_amount' className="form-control" value = {this.state.sell_amount} onChange={this.handleAmountChange}/><br/>
                    
                    <lable className = 'sell-price'>Price:</lable>
                    <input type='text' name='sell_price'  className="form-control" value = {this.state.sell_price} onChange={this.handlePriceChange}/><br/>
                    
                    <lable className='lable'>Total Price:</lable>
                    <input type='text' name='sell_sum' className="form-control" value ={this.getTotal_sell(this.state.sell_amount , this.state.sell_price)} disabled/><br/> 
                    
                    <Button bsStyle="danger" type='submit' className='sell_button'>SELL USD</Button>
                    </form>
                </div>
            </div>  
            
        )
    }
}