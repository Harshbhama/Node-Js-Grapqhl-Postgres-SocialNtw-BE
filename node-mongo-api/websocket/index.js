const webSocketServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer();
server.listen(webSocketServerPort);
console.log("listening on port 8000")

const wsServer = new webSocketServer({
    httpServer: server
})
const clients = {}

const getUniqueId = () => {
    return Math.random()
}

wsServer.on('request', function(request){
    var userId = getUniqueId();
    const connection = request.accept(null, request.origin)
    clients[userId] = connection
    console.log(userId)
    connection.on('message', function(message){
        // console.log(message)
        if(message.type === 'utf8'){
            for(key in clients){
                clients[key].sendUTF(message.utf8Data)
            }
        }
    })
})