function Lead(sessionToken) {
  this.sessionToken = sessionToken;
  
}

Lead.prototype.set = function(key, value) {
  this[key] = value;
}

Lead.prototype.get = function(key) {
  return this[key];
}

module.exports = Lead;
