import React, { Component } from 'react';

class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageInput: ''
    };

    this.updateMessage = this.updateMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  updateMessage(e) {
    const message = e.target.value;

    this.setState({ messageInput: message});
  }

  submitMessage(e) {
    e.preventDefault();

    this.props.submitMessages(this.state.messageInput);
    this.setState({ messageInput: '' });
  }

  render() {
    return (
      <form onSubmit={this.submitMessage}>
        <input
          type="text"
          placeholder="message here..."
          onChange={this.updateMessage}
          value={this.state.messageInput}
        />
        <input type="submit" value="Go" />
      </form>
    );
  }
}

export default MessageInput;
