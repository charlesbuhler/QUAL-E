import React from 'react';

const Message = ({ username, message }) => (
  <div>
    <div>{username}</div>
    <div>{message}</div>
  </div>
);
export default Message;
