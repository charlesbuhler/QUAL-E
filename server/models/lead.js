function Lead(sessionToken) {
  this.sessionToken = sessionToken;
  
}

Lead.prototype.getSessionToken = function () {
  return this.sessionToken;
}

Lead.prototype.getFullName = function () {
  return this.fullName;
}

Lead.prototype.setFullName = function (fullName) {
  this.fullName = fullName;
}

module.exports = Lead;
