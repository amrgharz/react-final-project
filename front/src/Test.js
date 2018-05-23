//import React from 'react'
//
//class Exchange extends React.Component{
//    static defaultProps = {
//        min:0,
//        max:Infinity
//    }
//    state = {
//        amount:0,
//        price:0
//    }
//    onAmountChange = (evt) => {
//        if(evt.target.value === ''){ return this.setState({amount:''})}
//        const value = parseInt(evt.target.value)
//        const { max, min } = this.props
//        if(value > max){
//            this.setState({'amount':max, error:`you don't have enough funds!`})
//        }
//        else if(value < min){
//            this.setState({'amount':min, error:`you can't go lower than ${min}!`})
//        }
//        else{
//            this.setState({'amount':value})
//        }
//    }
//    onPriceChange = (evt) => {
//        if(evt.target.value === ''){ return this.setState({price:''})}
//        const value = parseInt(evt.target.value)
//        this.setState({'price':value})
//    }
//    getTotal = (amount,price) => {
//        return amount * price
//    }
//    onSubmit = (evt) => {
//        evt.preventDefault();
//        evt.stopPropagation();
//        const { amount, price } = this.state
//        const total = this.getTotal(amount, price)
//        const order = { amount, price, total }
//        this.props.onSubmit(order)
//    }
//    render(){
//        const { amount, price, error } = this.state
//        const { title, max } = this.props
//        const total = this.getTotal(amount, price)
//        const disabled = max === 0
//        const canSubmit = ( amount > 0 && price > 0 )
//        return (<form onSubmit={this.onSubmit}>
//            <h2>{title}</h2>
//            { error ? <div>{error}</div> : null } 
//            <input type="number" disabled={disabled} name="amount" onChange={this.onAmountChange} value={amount}/>
//            <input type="number" disabled={disabled} name="price" onChange={this.onPriceChange} value={price}/>
//            <input type="number" value={total} name="total" disabled/>
//            <input type="submit" value="ok" disabled={!canSubmit}/>
//        </form>)
//    }
//}
//
//const Order = ({amount,total,price}) => 
//    <div>
//        amount: {amount} | 
//        price: {price} | 
//        total: <strong>{total}</strong>
//    </div>
//
//export default class Test extends React.Component{
//    state = {
//        user:{
//            amount:100
//        },
//        ordersList:[
//            { id:0, price:10, amount:10, total:100 },
//            { id:1, price:20, amount:10, total:200 },
//        ],
//        offersList:[
//            { id:0, price:1, amount:10, total:10 },
//            { id:1, price:2, amount:10, total:20 },
//        ]
//    }
//    componentDidMount(){
//        firebase.db.get('orders').on('change',(orders)=>this.setState({orders}))
//    }
//    onAddOrder = (order) => {
//        const userAmount = this.state.user.amount - order.amount
//        const id = (new Date())+Math.random()
//        const ordersList = [...this.state.ordersList, { ...order, id } ]
//        const user = { ...user, amount:userAmount}
//        //this.setState({ ordersList, user })
//        fire.base.db.get('orders').push(order)
//    }
//    onAddOffer = (order) => {
//        const id = (new Date())+Math.random()
//        const offersList = [...this.state.offersList, {...order, id } ]
//        this.setState({ offersList })
//    }
//    onMatchBuy = () => {
//        this.onMatchUnrelated()
//        alert('you bought an item')
//    }
//    onMatchSell = () => {
//        this.onMatchUnrelated();
//        alert('you sold an item')
//    }
//    onMatchUnrelated = () => {
//        // come from database
//        const offerId = this.state.offersList[1].id
//        const orderId = this.state.ordersList[0].id
//
//        const offersList = this.state.offersList.filter( offer => offer.id !== offerId)
//
//        const ordersList = this.state.ordersList.filter( order => order.id !== orderId)
//
//        this.setState({ ordersList, offersList })
//
//    }
//    render(){
//        return (<div>
//            <button onClick={this.onMatchUnrelated}>simulate</button>
//            <h1>you have {this.state.user.amount} cookies</h1>
//            <h3>Orders</h3>
//            <ul>
//                { this.state.ordersList.map( order  => {
//                    return (<li key={ order.id }><Order {...order}/></li>)
//                })}
//            </ul>
//            <h3>Offers</h3>
//            <ul>
//            { this.state.offersList.map( order => {
//                return (<li key={ order.id }><Order {...order}/></li>)
//            })}
//            </ul>
//            <Exchange onSubmit={this.onAddOrder} max={this.state.user.amount} title="Sell"/>
//            <Exchange onSubmit={this.onAddOffer} title="Buy"/>
//        </div>)
//    }
//}