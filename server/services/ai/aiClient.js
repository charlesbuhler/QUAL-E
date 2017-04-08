const apiai = require('apiai');

const APP_CONFIG = require('../../../APP_CONFIG.json');

var setConstApp = apiai(APP_CONFIG.ai_client_access_token);

function AIClient() {}

AIClient.prototype.sendRequest = function (message, sessionToken) {
  return setConstApp.textRequest(message, {
      sessionId: sessionToken
    }
  );
}


module.exports = new AIClient();