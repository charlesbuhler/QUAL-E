import React from 'react';

const MessageInput = ({handleKeyPress, updateMessage, messageInput}) => {
  return (
    <textarea className="input" id="input"
              type="text"
              placeholder="message here..."
              onChange={updateMessage}
              value={messageInput}
              onKeyPress={handleKeyPress}
    />
  );
};

export default MessageInput;
