const http = require ('http')

const server = http.createServer()

const handleRequest = (req , res )=>{
    res.end('oketooo')
}

server.on('request' , handleRequest)
server.listen(5555 , ()=> console.log('our badass server is ready'))

const io = require ('socket.io')(server);

const buy_orders_list = [
    
]

const sell_orders_list = [
    
] 


io.on('connection' , (socket) =>{
    console.log('Mr. wizard is connected')

    socket.on('start',() =>{
        io.emit('start', buy_orders_list, sell_orders_list)
    })

    socket.on('sell_order:add' , sell_order =>{
        const matched_buy_order = check_buy_orders(buy_order)
        if(matched_buy_order){
            buy_orders_list.splice(matched_buy_order.index , 1 )
            io.emit('buy_orders:change' , buy_orders)
        }
    })

    socket.on('check:sell' , order => {
        for (var i = 0; i < sell_orders_list.length; i++){
            if (order.price == sell_orders_list[i].sell_price){
                if (order.amount == sell_orders_list[i].sell_amount){
                    sell_orders_list.splice(i,1)
                    buy_orders_list.splice(buy_orders_list.indexOf(order,1))
                }
                else if (order.amount < sell_orders_list[i].sell_amount){
                    sell_orders_list[i].sell_amount -= order.amount 
                    buy_orders_list.splice(buy_orders_list.indexOf(order,1))
                }
                else if (order.amount > sell_orders_list[i].sell_amount){
                    var difference = order.amount - sell_orders_list[i].sell_amount
                    buy_orders_list.splice(buy_orders_list.indexOf(order,1))
                    sell_orders_list.splice(i,1)
                    order.amount = difference
                    buy_orders_list.push(order)
                }
            }
        }
        io.emit('check:sell', buy_orders_list, sell_orders_list)
    })

    socket.on('check:buy' , order => {
        for (var i = 0; i < buy_orders_list.length; i++){
            if (order.price == buy_orders_list[i].price){
                if (order.amount == buy_orders_list[i].amount){
                    buy_orders_list.splice(i,1)
                    sell_orders_list.splice(sell_orders_list.indexOf(order,1))
                }
                else if (order.amount < buy_orders_list[i].amount){
                    buy_orders_list[i].amount -= order.amount 
                    sell_orders_list.splice(sell_orders_list.indexOf(order,1))
                }
                else if (order.amount > buy_orders_list[i].amount){
                    var difference = order.amount - buy_orders_list[i].amount
                    sell_orders_list.splice(sell_orders_list.indexOf(order,1))
                    buy_orders_list.splice(i,1)
                    order.amount = difference
                    sell_orders_list.push(order)
                }
            }
        }
        io.emit('check:sell', buy_orders_list, sell_orders_list)
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