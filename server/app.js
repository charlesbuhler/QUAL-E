var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// TODO: Extract chat client, services, etc.

var ChatClient = function() {
  
  this.getResponseFromMessage = function(message) {
    return 'you said ' + message + '. ' + 'I say hi!';
  }
};

var chatClient = new ChatClient();

// TODO: Replace with react app
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(message){
    
    var response = chatClient.getResponseFromMessage(message);

    io.emit('chat message', response);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
