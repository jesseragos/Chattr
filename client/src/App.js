import React, { Component } from "react";
import UsernameForm from "./components/UsernameForm";
import ChatScreen from "./ChatScreen";
import Chatkit from "@pusher/chatkit-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUsername: "",
      currentScreen: "WhatIsYourUsernameScreen",
      errorUserAction: "",
      chatManagerConnection: null
    };
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }

  onUsernameSubmitted(submitAction, userName) {
    userName = userName.trim();

    if (submitAction === "Register") {
      this.registerUserName(userName);
    } else {
      this.connectToChatManager(userName);
    }
  }

  registerUserName = userName => {
    fetch(
      "/users",
      // reqMeta
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName })
      }
    )
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(JSON.stringify(data));

        this.connectToChatManager(userName);
      })
      .catch(error => {
        let errorInfo = JSON.parse(error.message);
        this.handleError(errorInfo.error, errorInfo.error_description);
      });
  };

  connectToChatManager = userName => {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:ce026d83-5843-4303-9d2c-33e38e01319e",
      userId: userName,
      tokenProvider: new Chatkit.TokenProvider({
        url: "/authenticate"
      })
    });

    chatManager
      .connect()
      .then(currentUsername => {
        this.setState({
          currentUsername: currentUsername,
          currentScreen: "ChatScreen"
        });
      })
      .catch(error => {
        this.handleError(error.info.error, error.info.error_description);
      });
  };

  handleError = (error, errorDesc) => {
    let messageAlert = "";

    switch (error) {
      case "services/chatkit/user_already_exists":
        messageAlert = "Username already exists";
        break;
      case "services/chatkit_authorizer/authorization/invalid_token_subject":
      case "services/chatkit/unprocessable_entity/validation_failed":
        messageAlert = "Please input appropriate username";
        break;
      default:
        messageAlert = errorDesc;
    }

    this.setState({
      errorUserAction: messageAlert
    });
  };

  render() {
    let display;

    switch (this.state.currentScreen) {
      case "WhatIsYourUsernameScreen":
        display = (
          <UsernameForm
            onSubmit={this.onUsernameSubmitted}
            errorUserAction={this.state.errorUserAction}
          />
        );
        break;
      case "ChatScreen":
        display = (
          <ChatScreen
            currentUsername={this.state.currentUsername}
            chatManagerConnection={this.state.chatManagerConnection}
          />
        );
        break;
      default:
        display = <h1>Something went wrong on rendering the page</h1>;
    }

    return display;
  }
}

export default App;
