var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const leadEngine = require('./engines/leadEngine.js');

// TODO: Replace with react app
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var sessionToken = leadEngine.createLeadAndSession();
  io.emit('chat message', sessionToken);
  
  socket.on('chat message', function(message){

    var responseMessage = leadEngine.updateLeadFromMessage(message);
    io.emit('chat message', responseMessage);
  });

  socket.on('disconnect', function() {
      var responseMessage = leadEngine.finalizeLead();
      io.emit('chat message', responseMessage);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
