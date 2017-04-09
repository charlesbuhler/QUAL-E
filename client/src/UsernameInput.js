import React, { Component } from 'react';

class UsernameInput extends Component {
  constructor(props) {
    super(props);

    this.updateUsername = this.updateUsername.bind(this);
    this.submitUsername = this.submitUsername.bind(this);
  }

  updateUsername(e) {
    const username = e.target.value;

    this.props.updateUsername(username);
  }

  submitUsername(e) {
    e.preventDefault();

    this.props.submitUsername(this.props.username);
  }

  render() {
    return (
      <form className="input" onSubmit={this.submitUsername}>
        <input
          type="text"
          placeholder="name here..."
          onChange={this.updateUsername}
          value={this.props.username}
        />
        <input type="submit" value="Go" />
        <div className="send"></div>
      </form>
    );
  }
}

export default UsernameInput;
