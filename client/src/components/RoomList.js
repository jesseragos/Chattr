import React from "react";
import LoadingSpinner from "./LoadingSpinner";

class RoomList extends React.Component {
  render() {
    const orderedRooms = [...this.props.rooms].sort((a, b) => a.name > b.name);
    let channelList = <LoadingSpinner />;

    if (orderedRooms.length > 0) {
      channelList = (
        <ul className="navbar-nav align-items-center">
          {orderedRooms.map(room => {
            const active =
              room.id === this.props.currentRoom.id ? "activeChannel" : "";
            return (
              <li key={room.id} className={"nav-item " + active}>
                <button
                  className="btn btn-link"
                  onClick={() => this.props.subscribeToRoom(room.id)}
                >
                  # {room.name}
                </button>
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark primary fixed-top"
        id="sideNav"
      >
        <a className="navbar-brand js-scroll-trigger" href="#page-top">
          <span className="d-none d-lg-block">
            <h1>Chattr</h1>
          </span>
          <span className="d-inline d-lg-none h1-small">Chattr</span>
          {this.props.currentRoom.name ? (
            <span className="d-inline d-lg-none ml-2 badge badge-pill primary-fade channelNameSmall">
              Channel: {this.props.currentRoom.name}
            </span>
          ) : (
            ""
          )}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse flex-column"
          id="navbarSupportedContent"
        >
          {/* <!-- User list --> */}
          {this.props.children}

          <h3 className="flexJustifyCenter">Channels</h3>

          {channelList}

          <div className="mt-5 pb-2 flexJustifyCenter">
            <button
              type="button"
              className="btn accent"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <i className="fas fa-plus mr-1" /> Channel
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default RoomList;
