'use strict';
const lead = require('../models/lead.js');
const aiClient = require('../services/ai/aiClient.js');

function LeadEngine() {}

LeadEngine.prototype.createLeadAndSession = function(chatMessage) {
  var sessionToken = '123';//Math.floor(100000000 + Math.random() * 900000000);

  // Hold onto lead somewhere
  var leadTiedToSession = new lead(sessionToken);
  console.log(leadTiedToSession.getSessionToken());

  return "created with session token: " + sessionToken;
}

LeadEngine.prototype.updateLeadFromMessage = function(chatMessage) {
  // Send message to AIClient
  // Update lead from AIClient response

  aiClient.sendRequest(chatMessage, '123');
  
  return "Hey there friend. I just got your " + chatMessage + " message. Thanks!";
}

LeadEngine.prototype.finalizeLead = function() {
  // Pass lead to EmailService

  return "done";
}

module.exports = new LeadEngine();
