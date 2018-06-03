import React from 'react';

import './Trade.css'

import io from 'socket.io-client'

import TradingViewWidget from 'react-tradingview-widget';
    
import {Link} from 'react-router-dom' 

//import {Row , Grid , Col , Button } from 'react-bootstrap'


export default class Trading extends React.Component{
    constructor(){
        super();
        this.state = {
            min:0,
            max: '',
            user:{
                x_amount:100,
                y_amount:150
            },
            socket:null,
            price: '',
            amount: '',
            sum: '',
            buy_orders_list : [],
            sell_price: '',
            sell_amount: '',
            sell_sum: '',
            sell_orders_list : []
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
        if(order.sum > this.state.user.y_amount){
            alert("oops you do not have enough money")
            return
        }
        const y_amount = this.state.user.y_amount - order.sum
        const user = { ...this.state.user, y_amount }
        const newState = { user }
        const final_x_amount = this.state.user.x_amount + order.amount
        var stateCopy_x = Object.assign({},this.state);
        stateCopy_x.user.x_amount = final_x_amount;
        this.setState(newState)
        this.setState(stateCopy_x)
        this.state.socket.emit('add:order' , order)
        this.state.socket.emit('check:sell' , order)
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
        if(sell_order.sell_amount > this.state.user.x_amount ){
            alert('you don\'t have enough X')
            return
        }
        const final_amount = this.state.user.x_amount - sell_order.sell_amount
        const final_y_amount = this.state.user.y_amount + sell_order.sell_sum
        var stateCopy = Object.assign({},this.state);
        stateCopy.user.x_amount = final_amount;
        var stateCopy_y = Object.assign({},this.state);
        stateCopy_y.user.y_amount = final_y_amount;
        this.setState(stateCopy)
        this.state.socket.emit('add:sell_order' , sell_order)
        this.state.socket.emit('check:buy' , sell_order)
    }

    

    componentDidMount(){
        const socket = io('http://localhost:5555')
        this.setState({ socket: socket }, () => {
            this.state.socket.emit('start')
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
            this.setState({buy_orders_list, sell_orders_list})
        })
        socket.on('check:buy', (buy_orders_list, sell_orders_list) => {
            this.setState({buy_orders_list, sell_orders_list})
        })
        socket.on('start', (buy_orders_list, sell_orders_list)=> {
            this.setState({buy_orders_list, sell_orders_list})    
        })

    }

    on_add_sell_order = (sell_order) =>{
        this.state.socket.emit('sell_order:add' , sell_order)
    }

    

    
    
    render(){
        return(
            <div id="container">
            <nav className = 'nav'>
                            <Link to='/' className='bitchange'>BITCHANGE</Link> 
                            <Link to='/' className='log_out'>Log Out</Link>
                            <Link to='about' className='about'>About</Link>
                        </nav>
                <div className="chart">
                    <TradingViewWidget autosize symbol="BTCUSD" />
                </div>
                <div className="buy_orders">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th style={{textAlign:'center'}}>Amount</th>
                                <th style={{textAlign:'center'}}>Price</th>
                                <th style={{textAlign:'center'}}>Sum</th>
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
                   <table className='table'>
                          <thead>
                            <tr>
                                <th style={{textAlign:'center'}}>Amount</th>
                                <th style={{textAlign:'center'}}>Price</th>
                                <th style={{textAlign:'center'}}>Sum</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.sell_orders_list.sort((a,b)=>a.sell_price>b.sell_price)
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
                    <form name='buyform' onSubmit = {this.handleSubmit_buy}>
                    <span><strong>Buy X  ||  </strong>{`You have : ${this.state.user.y_amount}  of Y`}</span>
                        <ul className='flex-outer'>
                            <li>
                                <label for="amount_of_x">Amount of X:</label>
                                <input type='number' name='amount' value = {this.state.amount} onChange={this.handleAmountChange} />
                            </li>
                        
                            <li>
                                <label for='price' className='buy_price'>Price:</label>
                                <input type='text' name='price' value = {this.state.price} onChange={this.handlePriceChange} />
                            </li>
                            <li>
                                <label for='total_price'>Total Price:</label>
                                <input type='text' name='sum' value = {this.getTotal_buy(this.state.amount, this.state.price)} disabled  />
                            </li>
                            <li>
                                <input type='submit' value='Buy' className='buy_button'/>
                            </li>
                        </ul>
                    </form>
                
                
                </div>
                <div className='Place_sell_order'>
                    <form name='sellform' onSubmit={this.handleSubmit_sell}>
                    <span> <strong>Sell X   ||  </strong>{`You have : ${this.state.user.x_amount}  of X`}</span>
                        <ul className='flex-outer'>
                        <li>
                            <lable fore='Amount of X'>Amount of X:</lable>
                            <input type='number' name='sell_amount' value = {this.state.sell_amount} onChange={this.handleAmountChange}/>
                        </li>
                        <li>
                            <lable className = 'sell-price' style ={{marginRight:'42px'}}>Price:</lable>
                            <input type='text' name='sell_price'  value = {this.state.sell_price} onChange={this.handlePriceChange}/>
                        </li>
                        <li>
                            <lable className='lable'>Total Price:</lable>
                            <input type='text' name='sell_sum'  value ={this.getTotal_sell(this.state.sell_amount , this.state.sell_price)} disabled/>
                        </li>
                        <li>
                            <input type='submit' value='sell' className='sell-button' />
                        </li>
                        </ul>
                    </form>
                </div>
            </div> 
            
        )
    }
}