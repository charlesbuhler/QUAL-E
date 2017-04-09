import React from 'react';
import QUALE from './assets/qualE_avatar.svg';
import USER from './assets/user_icon.jpeg';

const Message = ({ message, me }) => {
  const leftOrRight = me ? 'me' : 'them';
  const src = me ? USER : QUALE;

  return (
    <div className={`message-wrapper ${leftOrRight}`}>
      <img src={src} className="circle-wrapper animated bounceIn"></img>
      <div className="text-wrapper animated fadeIn">{message}</div>
    </div>
  );
};

export default Message;
