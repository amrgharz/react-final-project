import React from 'react';

import './Trade.css'

//import {Row , Grid , Col , Button } from 'react-bootstrap'

export default class Trading extends React.Component{
    
    render(){
        return(
            <div id="container">
                <div className="nav">nav
                <button className="log_out">Log Out</button>
            </div>
            <div className="chart">chart</div>
            <div className="buy_orders">buy_orders</div>
            <div className="sell_orders">sell orders</div>
            <div className='Place_buy_order'>place buy order</div>
            <div calssName='Place_sell_order'>place sell order</div>
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