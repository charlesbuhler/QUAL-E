function NlpResult(response, params, action) {
  this.response = response;
  this.params = params;
  this.action = action; 
}

// NlpResult.prototype.getSessionToken = function () {
//   return this.sessionToken;
// }

module.exports = NlpResult;
