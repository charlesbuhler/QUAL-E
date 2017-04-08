import React, { Component } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import UsernameInput from './UsernameInput';
import io from 'socket.io-client';

let socket = io.connect();

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      hasName: false,
      messages: [],
      messageInput: ''
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.submitUsername = this.submitUsername.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  componentDidMount() {
    socket.on('chat message', (data) => {
      console.log('data', data);
    });
  }

  updateUsername(username) {
    this.setState({ username });
  }

  submitUsername(username) {
    this.setState({
      username,
      hasName: true
    });
  }

  updateMessage(e) {
    const message = e.target.value;

    this.setState({ messageInput: message});
  }

  submitMessage(e) {
    e.preventDefault();

    const { username, messageInput } = this.state;
    const messageObj = {
      username,
      message: messageInput
    };

    socket.emit(messageObj);
    this.addMessageToWindow(messageObj);
  }

  addMessageToWindow(messageObj) {
    const { messages } = this.state;

    messages.push(messageObj);
    this.setState({ messages, messageInput: '' });
  }

  render() {
    let input;

    if (!this.state.hasName) {
      input = <UsernameInput
        submitUsername={this.submitUsername}
        updateUsername={this.updateUsername}
        username={this.state.username}
      />
    } else {
      input = <MessageInput
        messageInput={this.state.messageInput}
        updateMessage={this.updateMessage}
        submitMessage={this.submitMessage}
      />
    }

    return (
      <div className="container">
        <Messages messageList={this.state.messages} />
        {input}
      </div>
    );
  }
}

export default Chat;