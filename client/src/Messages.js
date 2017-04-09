import React, { Component } from 'react';
import Message from './Message';

class Messages extends Component {
  render() {
    const messageItem = this.props.messageList.map((message, index) => (
      <Message
        key={index}
        username={message.username}
        message={message.message}
        me={message.me}
      />
    ));

    return (
      <div className="content" id='content'>
        {messageItem}
      </div>
    );
  }

}

export default Messages;
