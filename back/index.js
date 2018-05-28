const http = require ('http')

const server = http.createServer()

const handleRequest = (req , res )=>{
    res.end('oketooo')
}

server.on('request' , handleRequest)
server.listen(5555 , ()=> console.log('our badass server is ready'))

const io = require ('socket.io')(server);

io.on('connection' , (socket) =>{
    console.log('a fucken user is connected')
})