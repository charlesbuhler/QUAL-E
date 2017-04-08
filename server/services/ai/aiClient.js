const apiai = require('apiai');

const AI_CONFIG = require('../../../AI_CONFIG.json');

var setConstApp = apiai(AI_CONFIG.ai_client_access_token);

function AIClient() {}

AIClient.prototype.sendRequest = function (message, sessionToken) {
  var request = setConstApp.textRequest(message, {
      sessionId: sessionToken
    }
  );
  
  request.on('response', function (response) {
    console.log('response', response);
  });

  request.end();
}


module.exports = new AIClient();