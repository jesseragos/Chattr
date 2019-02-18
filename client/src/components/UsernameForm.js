import React, { Component } from "react";
import SubmitButton from "./SubmitButton";
import AlertMessage from "./AlertMessage";
import LoadingSpinner from "./LoadingSpinner";

class UsernameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };

    this.submitAction = "";
  }

  clickedAction = clickedActionName => {
    this.submitAction = clickedActionName;
  };

  onSubmit = e => {
    e.preventDefault();

    this.toggleLoading(true);

    console.log("UsernameForm:24", this.submitAction, e);

    this.props.onSubmit(this.submitAction, this.state.username);
  };

  onChange = e => {
    this.updateUserName(e.target.value);
  };

  updateUserName = givenUserName => {
    this.setState({ username: givenUserName });
  };

  toggleLoading = isShow => {
    let loadingElem = document.getElementById("loading");
    if (isShow) {
      loadingElem.classList.remove("d-none");
    } else {
      loadingElem.classList.add("d-none");
    }
  };

  render() {
    return (
      <div className="primary userForm">
        <div className="userFormContainer">
          <div className="jumbotron bg-transparent userFormBorder">
            <div className="mx-auto">
              <h1 className="text-center">Chattr</h1>
              <p className="subtitle mb-4">
                A simple React and Chatkit application
              </p>
              <form id="user-form" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="userName">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    aria-describedby="text"
                    placeholder="min. 5 characters"
                    onChange={this.onChange}
                    pattern=".{5,30}"
                    autoFocus
                    required
                  />
                </div>
                <div className="text-center px-2">
                  <SubmitButton
                    name="Login"
                    className="outlineAccent"
                    onClick={this.clickedAction}
                  />
                  <SubmitButton
                    name="Register"
                    className="accent"
                    onClick={this.clickedAction}
                  />
                </div>
              </form>
            </div>
            <LoadingSpinner />
            <AlertMessage
              errorUserAction={this.props.errorUserAction}
              toggleLoading={this.toggleLoading}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UsernameForm;
