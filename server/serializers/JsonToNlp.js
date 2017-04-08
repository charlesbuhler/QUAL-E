var NlpResult = require("../models/nlpResult.js");

module.exports = function(result) {
    var message, action, params;
    
    var actionTypes = {
        "UNKNOWN": "UNKNOWN",
        "CLARIFY": "CLARIFY",
        "QUALIFIED": "QUALIFIED",
        "DISQUALIFIED": "DISQUALIFIED"
    }

    if (!result) {
        console.log("no result");
        return;
    }

    message  = result.fulliment && result.fulliment.speech;
    params   = result.parameters;

    if (result.action.includes("clarification")) {
        action = actionTypes["CLARIFY"];
    } else if (result.action.includes("disqualify")) {
        action = actionTypes["DISQUALIFIED"];
    } else if (result.action.includes('qualification')) {
        action = actionTypes["QUALIFIED"];
    } else {
        action = actionTypes["UNKNOWN"];
    }
    
    return new NlpResult(message, params, action);
}