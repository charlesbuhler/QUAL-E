exports.init = () => {
    
    this.createLeadAndSession = () => {
      return "created";  
    }

    this.updateLeadFromMessage = (chatMessage) => {
        return "Hey there friend. I just got your " + chatMessage + " message. Thanks!";
    }

    this.finalizeLead = () => {
        return "done";
    }
    
    return this;
}
