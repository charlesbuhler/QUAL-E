'use strict';
const lead = require('../models/lead.js');
const aiClient = require('../services/ai/aiClient.js');
const jsonToNlp = require('../serializers/JsonToNlp.js');
const sendEmail = require('../services/email/sendEmail.js');

function LeadEngine() {
  this.paramMap = {
      "given-name": "name",
      "address": "address",
      "good_ownership": "ownership",
      "good_hometypes": "residenceType",
      "goodroof": "roofType",
      "date-time": "apptDateTime"
  };

  this.leads = {}; //<SessionId, Lead>
}

function isCompleted(lead, paramMap) {

  for (var key in paramMap) {
    var value = paramMap[key];
    if (!lead.get(value)) {
      return false;
    }
  }
  return true;
}


LeadEngine.prototype.createLeadAndSession = function(chatMessage) {
  var sessionToken = '123';//Math.floor(100000000 + Math.random() * 900000000);

  var leadTiedToSession = new lead(sessionToken);
  this.leads[sessionToken] = leadTiedToSession;

  return sessionToken;
}

LeadEngine.prototype.updateLeadFromMessage = function(nlpResult, sessionToken) {

  var currentLead = this.leads[sessionToken];

  var params = nlpResult.params;
  for (var key in params) {
    if (this.paramMap[key] && params[key] !== '') {
      currentLead.set(this.paramMap[key], params[key]);
    }
  }

  console.log('params', params);
  console.log('currentLead', currentLead);
  console.log('isCompleted', isCompleted(currentLead, this.paramMap));
  console.log('');
  
  if(isCompleted(currentLead, this.paramMap)) {
    
    sendEmail("tima.haines@gmail.com", currentLead);
    return "You're qualified! Someone will be contacting you shortly!";
  }
  
  return nlpResult.response;
}

LeadEngine.prototype.finalizeLead = function(sessionToken) {
  var currentLead = this.leads[sessionToken];
  sendEmail("tima.haines@gmail.com", currentLead);
  return "You're qualified! Someone will be contacting you shortly!";
}

module.exports = new LeadEngine();
