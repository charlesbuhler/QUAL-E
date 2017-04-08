import React from 'react';
import moment from 'moment';

const Message = ({ username, message }) => (
  <div>
    <div>{username}</div>
    <div>{message}</div>
    {/*<div>{moment.startOf('hour').fromNow()}</div>*/}
  </div>
);
export default Message;
