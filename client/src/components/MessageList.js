import React, { Component } from "react";
import ReactDOM from "react-dom";

class MessagesList extends Component {
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom =
      node.scrollTop + node.clientHeight + 200 >= node.scrollHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }

  render() {
    if (!this.props.roomId) {
      return (
        <div className="d-flex h-100 align-items-center justify-content-center">
          <div className="promptJoinChannel">Create/Join a channel from menu</div>
        </div>
      );
    }

    return (
      <div className="chatListArea">
        <ul className="chatList">
          {this.props.messages.map((message, index) => (
            <li key={index} className={
              this.props.currentUser.id === message.senderId
                ? "messageYou"
                : "messageSender"
            }>
              <div><strong>{message.senderId}</strong></div>
              <div className="chatMessage">
                <p>{message.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MessagesList;
