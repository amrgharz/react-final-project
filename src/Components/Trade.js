import React from 'react';

import './Trade.css'

//import {Row , Grid , Col , Button } from 'react-bootstrap'


export default class Trading extends React.Component{
    constructor(){
        super();
        this.state = {
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
                    amount: 10,
                    sum: 70
                },
                {
                    price: 7,
                    amount: 10,
                    sum: 70
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
     this.handleChange_buy = this.handleChange_buy.bind(this)
     this.handleSubmit_buy = this.handleSubmit_buy.bind(this)
     this.handleChange_sell = this.handleChange_sell.bind(this) 
     this.handleSubmit_sell = this.handleSubmit_sell.bind(this)  
    }
    handleChange_buy(event){
        this.setState({ [event.target.name]: event.target.value });
    }
    
    handleSubmit_buy(event){
        const order = {
            amount: parseInt(this.state.amount),
            price: parseInt(this.state.price),
            sum: parseInt(this.state.sum)
        }
        this.state.orders.push(order)
        this.setState({orders: this.state.orders})
        event.preventDefault();
    }
    handleChange_sell(event){
        this.setState({[event.target.name] : event.target.value});
    }

    handleSubmit_sell(event){
        debugger;
        const order_sell ={
            sell_amount: parseInt(this.state.sell_amount),
            sell_price : parseInt(this.state.sell_price),
            sell_sum : parseInt(this.state.sell_sum)
        }
        let old_sell_order = this.state.sell_orders;
        old_sell_order.push(order_sell)
        this.setState({sell_orders:old_sell_order})
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
                            <input type='number' name='amount' value = {this.state.amount} onChange={this.handleChange_buy} />
                        </div>
                        <div>
                            <span className='lable'>Price of X:</span>
                            <label className='ng-binding'></label>
                            <input type='text' name='price' value = {this.state.price} onChange={this.handleChange_buy} />
                        </div>
                        <div>
                            <span className='lable'>Total Price:</span>
                            <input type='text' name='sum' value = {this.state.sum} onChange={this.handleChange_buy} />
                        </div>
                        <input type='submit' value='Buy' className='buy'/>
                    </form>
                
                
                </div>
                <div className='Place_sell_order'>
                    <form name='sellform' onSubmit={this.handleSubmit_sell}>
                        <div className='filed-bigright'>
                            <span className='lable'>Amount of X:</span>
                            <label className='ng-binding'></label>
                            <input type='number' name='sell_amount' value = {this.state.sell_amount} onChange={this.handleChange_sell}/>
                        </div>
                        <div>
                            <span className='lable'>Price of X:</span>
                            <label className='ng-binding'></label>
                            <input type='text' name='sell_price' value = {this.state.sell_price} onChange={this.handleChange_sell}/ >
                        </div>
                        <div>
                            <span className='lable'>Total Price:</span>
                            <input type='text' name='sell_sum'  value = {this.state.sell_sum} onChange={this.handleChange_sell}/>
                        </div>
                        <input type='submit' value='Buy' className='buy' />
                    </form>
                </div>
            </div> 
            
        )
    }
}