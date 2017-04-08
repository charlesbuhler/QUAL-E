const apiai = require('apiai');

const AI_CONFIG = require('../../../AI_CONFIG.json');

var setConstApp = apiai(AI_CONFIG.ai_client_access_token);

function AIClient() {}

AIClient.prototype.sendRequest = function (message, sessionToken) {
  return setConstApp.textRequest(message, {
      sessionId: sessionToken
    }
  );
}


module.exports = new AIClient();