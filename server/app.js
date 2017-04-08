var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var leadEngine = require('./engines/leadEngine.js');
var AI = require('./services/ai/aiClient.js');
var jsonToNlp = require('./serializers/JsonToNlp.js');

app.use(express.static(path.resolve(__dirname + './../client/build')));

app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname + './../client/build/index.html'));
});

io.on('connection', function(socket){
  var sessionToken = leadEngine.createLeadAndSession();
  io.emit('chat message', sessionToken);

  socket.on('chat message', function(userResponse){
    
    var request = AI.sendRequest(userResponse.message, userResponse.sessionToken);
    
    request.on('response', function(response) {

      var nlpResult = jsonToNlp(response.result);
      var responseMessage = leadEngine.updateLeadFromMessage(nlpResult);

      io.emit('chat message', responseMessage);
    });

    request.on('error', function(response) {

      console.log('Error', response);
    });

    request.end();
  });

  socket.on('disconnect', function() {
      var responseMessage = leadEngine.finalizeLead();
      io.emit('chat message', responseMessage);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
