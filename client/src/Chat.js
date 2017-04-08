import React, { Component } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      hasName: false,
      messages: [],
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.submitUsername = this.submitUsername.bind(this);
    this.submitMessages = this.submitMessages.bind(this);
  }

  updateUsername(e) {
    this.setState({ username: e.target.value });
  }

  submitUsername(e) {
    e.preventDefault();

    this.setState({
      username: this.state.username,
      hasName: true
    });
  }

  submitMessages(message) {
    const { username } = this.state;
    const messageObj = {
      username,
      message
    }

    this.addMessageToWindow(messageObj);
  }

  addMessageToWindow(messageObj) {
    const { messages } = this.state;

    messages.push(messageObj);
    this.setState({ messages });
  }

  render() {
    if (!this.state.hasName) {
      return (
        <form onSubmit={this.submitUsername}>
          <p>Enter your name to begin</p>
          <input
            type="text"
            onChange={this.updateUsername}
            value={this.state.username}
            required />
          <input type="submit" value="Go" />
        </form>
      )
    }

    return (
      <div>
        <Messages messageList={this.state.messages} />
        <MessageInput submitMessages={this.submitMessages} />
      </div>
    );
  }
}

export default Chat;