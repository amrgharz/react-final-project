const http = require ('http')

const server = http.createServer()

const handleRequest = (req , res )=>{
    res.end('oketooo')
}

server.on('request' , handleRequest)
server.listen(3042, ()=> console.log('our badass server is ready'))

const io = require ('socket.io')(server);

const users = [
    {userId: 0, useremail: "amr.gharz@gmail.com", password: "12345", y_amount: 1000, x_amount: 1000},
    {userId: 1, useremail: "ahmad.khoja@gmail.com", password: "12345", y_amount: 2000, x_amount: 2000},
    {userId: 2, useremail: "jad.azar@gmail.com", password: "12345", y_amount: 3000, x_amount: 3000},
    {userId: 3, useremail: "paul@gmail.com", password: "12345", y_amount: 4000, x_amount: 4000}
]

const buy_orders_list = [ 
    {userId:0 , amount: 10 , price:10 , sum:80},
    {userId:0 , amount: 10 , price:11 , sum:90},
    {userId:0 , amount: 10 , price:12, sum:100},
    {userId:1 , amount: 10 , price:13 , sum:110},
    {userId:1 , amount: 10 , price:14 , sum:110}, 
]

const sell_orders_list = [
    {userId:2 , sell_amount: 10 , sell_price:12, sell_sum:120},
    {userId:2 , sell_amount: 10 , sell_price:13, sell_sum:130},
    {userId:2 , sell_amount: 10 , sell_price:14, sell_sum:140},
    {userId:3 , sell_amount: 10 , sell_price:15, sell_sum:150},
    {userId:3 , sell_amount: 10 , sell_price:15, sell_sum:150}, 
    
] 


    let  x_amount = 1000;
    let  y_amount = 1000
    
io.on('connection' , (socket) =>{
    console.log('Mr. wizard is connected')


    socket.on('startLogin',() =>{
        io.emit('startLogin', users )
    })

    socket.on('start',(userId) =>{
        for (var i = 0; i < users.length; i++){
            if (users[i].userId === userId){
                x_amount = users[i].x_amount
                y_amount = users[i].y_amount
            }
        }
        socket.emit('start', buy_orders_list, sell_orders_list, x_amount , y_amount )
    })

    //socket.on('sell_order:add' , sell_order =>{
    //    const matched_buy_order = check_buy_orders(buy_order)
    //    if(matched_buy_order){
    //        buy_orders_list.splice(matched_buy_order.index , 1 )
    //        io.emit('buy_orders:change' , buy_orders)
    //    }
    //})

    socket.on('check:sell' , (order, userId) => {
        let nothingHappened = true
        for (var i = 0; i < sell_orders_list.length; i++){
            if(nothingHappened !== true){
                break;
            }
            if (order.price == sell_orders_list[i].sell_price){
                if (order.amount == sell_orders_list[i].sell_amount){
                    console.log(1)
                    sell_orders_list.splice(i,1)
                    buy_orders_list.splice(buy_orders_list.indexOf(order,1))
                    users[userId].y_amount -= order.sum
                    users[userId].x_amount += order.amount
                    nothingHappened = false;
                    break;
                }
                else if (order.amount < sell_orders_list[i].sell_amount){
                    console.log(2)
                    sell_orders_list[i].sell_amount -= order.amount 
                    buy_orders_list.splice(buy_orders_list.indexOf(order,1))
                    console.log(userId)
                    users[userId].y_amount -= order.sum
                    users[userId].x_amount += order.amount
                    nothingHappened = false;
                    break;
                }
                else if (order.amount > sell_orders_list[i].sell_amount){
                    console.log(3)
                    var difference = order.amount - sell_orders_list[i].sell_amount
                    buy_orders_list.splice(buy_orders_list.indexOf(order,1))
                    sell_orders_list.splice(i,1)
                    order.amount = difference
                    buy_orders_list.push(order)
                    users[userId].y_amount -= order.sum
                    users[userId].x_amount += order.amount
                    nothingHappened = false;
                    break;
                }
            }
        }
        if(nothingHappened){
            users[userId].y_amount -= order.sum
        }
        io.emit('check:sell', buy_orders_list, sell_orders_list)
        socket.emit('check:y_amount', users[userId].y_amount , users[userId].x_amount)
    })

    socket.on('check:buy' , (sell_order, userId) => {
        let donothing = true
        for (var i = 0; i < buy_orders_list.length; i++){
            if (donothing !== true){
                break;
            }
            if (sell_order.sell_price == buy_orders_list[i].price){
                if (sell_order.sell_amount == buy_orders_list[i].amount){
                    buy_orders_list.splice(i,1)
                    sell_orders_list.splice(sell_orders_list.indexOf(sell_order,1))
                    users[userId].x_amount -= sell_order.sell_amount
                    users[userId].y_amount += sell_order.sell_sum
                    break;
                }
                else if (sell_order.sell_amount < buy_orders_list[i].amount){
                    buy_orders_list[i].amount -= sell_order.sell_amount 
                    users[userId].x_amount-= sell_order.sell_amount
                    sell_orders_list.splice(sell_orders_list.indexOf(sell_order,1))
                    break;
                }
                else if (sell_order.sell_amount > buy_orders_list[i].amount){
                    var difference = sell_order.sell_amount - buy_orders_list[i].amount
                    sell_orders_list.splice(sell_orders_list.indexOf(sell_order,1))
                    buy_orders_list.splice(i,1)
                    order.amount = difference
                    sell_orders_list.push(order)
                    break;
                }
            }
            
        }
        if(donothing){
            users[userId].x_amount -= sell_order.sell_amount
        }
        io.emit('check:buy', buy_orders_list, sell_orders_list , x_amount)
        socket.emit('check:x_amount' , users[userId].x_amount , users[userId].y_amount)
    })

    socket.on('add:order' , order =>{
        buy_orders_list.push(order)
        socket.emit('add:order' , buy_orders_list)
    })

    socket.on('add:sell_order', sell_order =>{
        sell_orders_list.push(sell_order)
        socket.emit('add:sell_order' , sell_orders_list)
    })
})