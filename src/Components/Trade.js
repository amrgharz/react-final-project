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
            ]
        }
     this.handleChange = this.handleChange.bind(this)
     this.handleSubmit = this.handleSubmit.bind(this)   
    }
    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }
    
    handleSubmit(event){
        const order = {
            price: parseInt(this.state.price),
            amount: parseInt(this.state.amount),
            sum: parseInt(this.state.sum)
        }
        this.state.orders.push(order)
        this.setState({orders: this.state.orders})
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
                                  <td>{item.price}</td>
                                  <td>{item.amount}</td>
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
                            {this.state.orders.sort((a,b)=>a.price<b.price)
                            .map((item , i)=>{
                                return [
                                    <tr key={i}>
                                        <td>{item.price}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.sum}</td>
                                    </tr>
                                ]
                            }
                        )
                            }
                          </tbody>
                    </table>
                </div>
                <div className='Place_buy_order'>
                    <form name='sellform' onSubmit = {this.handleSubmit}>
                        <div className='filed-bigright'>
                            <span className='lable'>Quantity of X:</span>
                            <label className='ng-binding'></label>
                            <input type='number' name='amount' value = {this.state.amount} onChange={this.handleChange} />
                        </div>
                        <div>
                            <span className='lable'>Price of X:</span>
                            <label className='ng-binding'></label>
                            <input type='text' name='price' value = {this.state.price} onChange={this.handleChange} />
                        </div>
                        <div>
                            <span className='lable'>Total Price:</span>
                            <input type='text' name='sum' value = {this.state.sum} onChange={this.handleChange} />
                        </div>
                        <input type='submit' value='Buy' className='buy'/>
                    </form>
                
                
                </div>
                <div className='Place_sell_order'><form name='buyform' onSubmit = {this.handleSubmit}>
                <div className='filed-bigright'>
                    <span className='lable'>Quantity of X:</span>
                    <label className='ng-binding'></label>
                    <input type='number' name='amount' value = {this.state.amount} onChange={this.handleChange} />
                </div>
                <div>
                    <span className='lable'>Price of X:</span>
                    <label className='ng-binding'></label>
                    <input type='text' name='price' value = {this.state.price} onChange={this.handleChange} />
                </div>
                <div>
                    <span className='lable'>Total Price:</span>
                    <input type='text' name='sum' value = {this.state.sum} onChange={this.handleChange} />
                </div>
                <input type='submit' value='Buy' className='buy'/>
            </form>
            </div>
            </div> 
            /*<div className='container-fluid'>
                 <div className="row">
                    <div className="col-sm-4 well" >
                        <div className='well'>
                            <input placeholder='buy orders'/>
                            <input placeholder='buy orders'/>
                        </div>
                        <div className='well'>
                            <input placeholder='sell orders'/>
                            <input placeholder='sell orders'/>
                        </div>
                        
                    </div>
                    <div class="col-sm-12">
                        <p>chart goes here</p>
                        
                    </div>
                </div>
            </div>*/
        )
    }
}