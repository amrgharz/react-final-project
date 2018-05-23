import React from 'react';

import './Trade.css'

//import {Row , Grid , Col , Button } from 'react-bootstrap'


export default class Trading extends React.Component{
    constructor(){
        super();
        this.state = {
            min:0,
            max:Infinity,
            price: 0,
            amount: 0,
            sum: 0,
            orders : [
                {
                    price: 5,
                    amount: 10,
                    sum: 70
                },
                {
                    price: 6,
                    amount:7,
                    sum: 42
                },
                {
                    price: 7,
                    amount: 8,
                    sum: 56
                }
            ],
            sell_price: 0,
            sell_amount: 0,
            sell_sum: 0,
            sell_orders : [
                {
                    sell_price: 5,
                    sell_amount: 10,
                    sell_sum: 70
                },
                {
                    sell_price: 6,
                    sell_amount: 10,
                    sell_sum: 70
                },
                {
                    sell_price: 7,
                    sell_amount: 10,
                    sell_sum: 70
                }
            ]

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
        const order = {
            amount: parseInt(this.state.amount , 10),
            price: parseInt(this.state.price , 10),
            sum: parseInt(event.target.sum.value , 10)
        }
        this.state.orders.push(order)
        this.setState({orders: this.state.orders})
        event.preventDefault();
    }

    handleSubmit_sell(event){
        const sell_order ={
            sell_amount: parseInt(this.state.sell_amount , 10),
            sell_price : parseInt(this.state.sell_price, 10 ),
            sell_sum : parseInt(event.target.sell_sum.value, 10 )
        }
        this.state.sell_orders.push(sell_order)
        this.setState({sell_orders: this.state.sell_orders})
        event.preventDefault();
    }
    
    render(){
        return(
            <div id="container">
                <div className="nav">nav
                    <button className="log_out">Log Out</button>
                </div>
                <div className="chart">chart</div>
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
                        {this.state.orders
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
                            {this.state.sell_orders.sort((a,b)=>a.sell_price<b.sell_price)
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
                        <div className='filed-bigright'>
                            <span className='lable'>Amount of X:</span>
                            <label className='ng-binding'></label>
                            <input type='number' name='amount' value = {this.state.amount} onChange={this.handleAmountChange} />
                        </div>
                        <div>
                            <span className='lable'>Price of X:</span>
                            <label className='ng-binding'></label>
                            <input type='text' name='price' value = {this.state.price} onChange={this.handlePriceChange} />
                        </div>
                        <div>
                            <span className='lable'>Total Price:</span>
                            <input type='text' name='sum' value = {this.getTotal_buy(this.state.amount, this.state.price)} disabled  />
                        </div>
                        <input type='submit' value='Buy' className='buy'/>
                    </form>
                
                
                </div>
                <div className='Place_sell_order'>
                    <form name='sellform' onSubmit={this.handleSubmit_sell}>
                        <div className='filed-bigright'>
                            <span className='lable'>Amount of X:</span>
                            <label className='ng-binding'></label>
                            <input type='number' name='sell_amount' value = {this.state.sell_amount} onChange={this.handleAmountChange}/>
                        </div>
                        <div>
                            <span className='lable'>Price of X:</span>
                            <label className='ng-binding'></label>
                            <input type='text' name='sell_price' value = {this.state.sell_price} onChange={this.handlePriceChange}/ >
                        </div>
                        <div>
                            <span className='lable'>Total Price:</span>
                            <input type='text' name='sell_sum'  value ={this.getTotal_sell(this.state.sell_amount , this.state.sell_price)} disabled/>
                        </div>
                        <input type='submit' value='sell' className='sell' />
                    </form>
                </div>
            </div> 
            
        )
    }
}