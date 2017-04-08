'use strict';
const lead = require('../models/lead.js');
const aiClient = require('../services/ai/aiClient.js');
const jsonToNlp = require('../serializers/JsonToNlp.js');

function LeadEngine() {}

LeadEngine.prototype.createLeadAndSession = function(chatMessage) {
  var sessionToken = '123';//Math.floor(100000000 + Math.random() * 900000000);

  // Hold onto lead somewhere
  var leadTiedToSession = new lead(sessionToken);
  console.log(leadTiedToSession.getSessionToken());

  return "created with session token: " + sessionToken;
}

LeadEngine.prototype.updateLeadFromMessage = function(message) {
  // Send message to AIClient
  // Update lead from AIClient response
  
  var nlp = jsonToNlp(message);
  
  return nlp.message;
}

LeadEngine.prototype.finalizeLead = function() {
  // Pass lead to EmailService

  return "done";
}

module.exports = new LeadEngine();
