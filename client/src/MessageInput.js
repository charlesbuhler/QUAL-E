import React from 'react';

const MessageInput = ({submitMessage, updateMessage, messageInput}) => {
  return (
    <form onSubmit={submitMessage}>
      <input
        type="text"
        placeholder="message here..."
        onChange={updateMessage}
        value={messageInput}
      />
      <input type="submit" value="Go"/>
    </form>
  );
};

export default MessageInput;
