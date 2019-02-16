import React, { Component } from "react";

class WhosOnlineList extends Component {
  renderUsers() {
    return (
      <div className="accordion mt-2 mb-5" id="accordionExample">
        <div id="headingOne flexJustifyCenter">
          <button
            className="btn accent rounded-circle p-2 mx-2 mt-2"
            type="button"
            data-toggle="collapse"
            data-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <i className="fas fa-users" />
          </button>
        </div>

        <div
          id="collapseOne"
          className="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <ul className="list-group text-left">
            {this.props.users.map((user, index) => {
              if (user.id === this.props.currentUser.id) {
                return (
                  <WhosOnlineListItem key={index} presenceState="online">
                    <strong>{user.name}</strong>
                  </WhosOnlineListItem>
                );
              }
              return (
                <WhosOnlineListItem
                  key={index}
                  presenceState={user.presence.state}
                >
                  {user.name}
                </WhosOnlineListItem>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.users) {
      return this.renderUsers();
    } else {
      return <React.Fragment />;
    }
  }
}

class WhosOnlineListItem extends Component {
  render() {
    return (
      <li className="list-group-item d-flex align-items-center">
        <div
          className={
            "userOnlineIndicator " +
            (this.props.presenceState === "online" ? "accent" : "noBgColor")
          }
        />
        {this.props.children}
      </li>
    );
  }
}

export default WhosOnlineList;
