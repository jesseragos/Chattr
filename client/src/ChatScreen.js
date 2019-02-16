import React, { Component } from "react";
import MessageList from "./components/MessageList";
import WhosOnlineList from "./components/WhosOnlineList";
import RoomList from "./components/RoomList";
import NewRoomForm from "./components/NewRoomForm";
import SendMessageForm from "./components/SendMessageForm";
import TypingIndicator from "./components/TypingIndicator";

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUsername,
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: [],
      roomId: null,
      joinableRooms: [],
      joinedRooms: []
    };
    // this.sendMessage = this.sendMessage.bind(this);
    // this.sendTypingEvent = this.sendTypingEvent.bind(this);
  }

  sendTypingEvent = () => {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error("error", error));
  }

  sendMessage = (text) => {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    });
  }

  componentDidMount() {
    this.getRooms();
  }

  getRooms = () => {
    this.state.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.state.currentUser.rooms
        })
      })
      .catch(err => console.log('error on joinableRooms: ', err))
  }

  subscribeToRoom = (roomId) => {
    this.setState({ messages: [] });
    this.state.currentUser.subscribeToRoom({
      roomId: roomId,
      messageLimit: 100,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          });
        },
        onUserStartedTyping: user => {
          this.setState({
            usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
          });
        },
        onUserStoppedTyping: user => {
          this.setState({
            usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
              username => username !== user.name
            )
          });
        },
        onPresenceChanged: (state, user) => this.forceUpdate(),
        onUserJoined: () => this.forceUpdate()
      }
    })
      .then(room => {
        this.setState({
          roomId: room.id,
          currentRoom: room
        })
        this.getRooms()
      })
      .catch(err => console.log('error on subscribing to room: ', err))
  }

  createRoom = (name) => {
    this.state.currentUser.createRoom({
      name
    })
      .then(room => {
        this.subscribeToRoom(room.id)
      })
      .catch(err => console.log('error with createRoom: ', err))
  }

  render() {
    return (
      <div id="chatScreen">
        {/* <!-- Channel list --> */}
        <RoomList
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
          currentRoom={this.state.currentRoom}
        >
          <WhosOnlineList
            currentUser={this.state.currentUser}
            users={this.state.currentRoom.users}
          />
        </RoomList>

        {/* <!-- Add channel form --> */}
        <NewRoomForm createRoom={this.createRoom} />

        <div className="p-0">

          <section className="app-section d-flex flex-column chatListContainer">
            {/* <!-- Chat list --> */}
            <MessageList
              messages={this.state.messages}
              currentUser={this.state.currentUser}
              roomId={this.state.roomId}
            />

            {/* <!-- Typing indicator --> */}
            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />

            {/* <!-- Send message --> */}
            <SendMessageForm
              onSubmit={this.sendMessage}
              onChange={this.sendTypingEvent}
            />
          </section>

        </div>
      </div>
    );
  }
}

export default ChatScreen;
