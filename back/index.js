const http = require ('http')

const server = http.createServer()

const handleRequest = (req , res )=>{
    res.end('oketooo')
}

server.on('request' , handleRequest)
server.listen(5555 , ()=> console.log('our badass server is ready'))

const io = require ('socket.io')(server);

const buy_orders_list = []

const sell_orders_list = []



io.on('connection' , (socket) =>{
    console.log('Mr. wizard is connected')

    socket.on('add:order' , order =>{
        buy_orders_list.push(order)
        socket.emit('add:order' , buy_orders_list)
    })

    socket.on('add:sell_order', sell_order =>{
        sell_orders_list.push(sell_order)
        socket.emit('add:sell_order' , sell_orders_list)
    })
})