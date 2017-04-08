'use strict';
const lead = require('../models/lead.js');
const aiClient = require('../services/ai/aiClient.js');
const jsonToNlp = require('../serializers/JsonToNlp.js');
const sendEmail = require('../services/email/sendEmail.js');

function LeadEngine() {
  this.leads = {}; //<SessionId, Lead>
}

LeadEngine.prototype.createLeadAndSession = function(chatMessage) {
  var sessionToken = '123';//Math.floor(100000000 + Math.random() * 900000000);

  var leadTiedToSession = new lead(sessionToken);
  this.leads.sessionToken = leadTiedToSession;
  
  console.log(leadTiedToSession.get('sessionToken'));

  return "created with session token: " + sessionToken;
}

LeadEngine.prototype.updateLeadFromMessage = function(nlpResult, sessionToken) {

  var currentLead = this.leads[sessionToken];

  // Logic to map params -> lead
  var params = nlpResult.params;
  if (params['good_roofs']) {
    lead.setRoof('roofType', params['good_roofs']);
  }
  
  return nlpResult.response;
}

LeadEngine.prototype.finalizeLead = function(sessionToken) {
  var currentLead = this.leads[sessionToken];
  sendEmail("tima.haines@gmail.com", currentLead);

  return "You're qualified! Someone will be contacting you shortly!";
}

module.exports = new LeadEngine();
