const http = require('http')

const server = http.createServer()

const handleRequest = (req , res) => {
    res.end('ok')
}

server.on('request' , handleRequest)
server.listen(8888 , ()=> console.log('server is ready '))


const io = require ('socket.io')(server);

let ids = 0;

const buy_orders =[
    {userId:0 , orderId :0 , price:10 , amount:10 , total:100},
    {userId:1 , orderId: 1 , price:20 , amount:10 , total:100}
]

const sell_orders =[
    {userId:0 , orderId :0 , price:10 , amount:10 , total:100},
    {userId:1 , orderId: 1 , price:20 , amount:10 , total:100}
]

const checkMach = (buy_orders , sell_orders) =>{
    console.log(buy_orders.userId , sell_orders.userId)
    if(buy_orders.userId !== sell_orders.userId){return false}
    if(buy_orders.price !== sell_orders.price){return false}
    return true
}

const check_buy_orders = (buy_orders) =>{
    for(let i=0 ; i<buy_orders.length; i++){
        const buy_orders = buy_orders[i]
        const match = checkMach(buy_orders , sell_orders)
        if (match){
            return  {offer , index:i}
        }
    }
    return false
}

const check_sell_orders = (sell_orders) =>{
    for(let i=0 ; i<sell_orders.length; i++){
        const sell_orders = sell_orders[i]
        const match = checkMach(buy_orders , sell_orders)
        if (match){
            return  {sell_orders , index:i}
        }
    }
    return false
}