import React, { Component } from 'react';
import Message from './Message';

class Messages extends Component {

  componentDidUpdate() {
    const appendBottom = document.getElementById('messageList');

    appendBottom.scrollTop = appendBottom.scrollHeight;
  }

  render() {
    const messageItem = this.props.messageList.map((message, index) => (
      <Message
        key={index}
        username={message.username}
        message={message.message}
      />
    ));

    return (
      <div id='messageList'>
        {messageItem}
      </div>
    );
  }

}

export default Messages;
