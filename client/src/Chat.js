import React, { Component } from 'react';
import './App.scss';
import Messages from './Messages';
import MessageInput from './MessageInput';
import io from 'socket.io-client';

let socket = io.connect();

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      hasName: false,
      messages: [],
      messageInput: '',
      sessionToken: '',
      firstMessage: true
    };

    this.updateUsername = this.updateUsername.bind(this);
    this.submitUsername = this.submitUsername.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  componentDidMount() {
    socket.on('chat message', (messageText) => {
      if (this.state.firstMessage) {
        return this.setState({sessionToken: messageText, firstMessage: false});
      }

      const message = this.createMessageObj('QUAL-E', messageText, false);
      this.addMessageToWindow(message);
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
    const { username, messageInput, sessionToken } = this.state;
    const message = this.createMessageObj(username, messageInput, true);

    socket.emit('chat message',
      {
        message: messageInput,
        sessionToken
      });
    this.addMessageToWindow(message);
  }

  createMessageObj = (username, messageText, me) => (
      {
        username,
        message: messageText,
        me
      }
  );

  handleKeyPress(e) {
    let key = e.key;
    if (key === 'Enter') { // enter key
      e.preventDefault();

      return this.submitMessage(e);
    }
  }

  addMessageToWindow(messageObj) {
    const { messages } = this.state;

    messages.push(messageObj);
    this.setState({ messages, messageInput: '' });
  }

  render() {
    return (
      <div>
        <div className="nav" id="nav">
          <div className="main-nav">
            <div className="toggle"></div>
            <div className="main-nav-item"></div>
            <div className="options"></div>
          </div>
        </div>
        <div className="inner" id="inner">
          <Messages messageList={this.state.messages} />
        </div>
        <div className="bottom">
          <MessageInput
            messageInput={this.state.messageInput}
            updateMessage={this.updateMessage}
            handleKeyPress={this.handleKeyPress}
          />
          <div className="send" id="send" onClick={this.submitMessage}></div>
        </div>
      </div>
    );
  }
}

export default Chat;