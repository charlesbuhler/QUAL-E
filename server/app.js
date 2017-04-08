var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var leadEngine = require('./engines/leadEngine.js');
var AI = require('./services/ai/aiClient.js');

app.use(express.static(path.resolve(__dirname + './../client/build')));

app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname + './../client/build/index.html'));
});

io.on('connection', function(socket){
  var sessionToken = leadEngine.createLeadAndSession();
  io.emit('chat message', sessionToken);

  socket.on('chat message', function(message){
    var request = AI.sendRequest(message, sessionToken);
    request.on('response', function(result) {
      var nlpRsult = jsonToNlp(message);
      
      var response = leadEngine.updateLeadFromMessage(nlpRsult);
      
      console.log('nlp result', nlpRsult);
      io.emit('chat message', response);
    });
  });

  socket.on('disconnect', function() {
      var responseMessage = leadEngine.finalizeLead();
      io.emit('chat message', responseMessage);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
