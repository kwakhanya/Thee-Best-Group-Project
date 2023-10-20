import { Component, Fragment } from "react";
import Sentiment from "sentiment";
import ChatMessage from "./ChatMessage";
import { initializeApp} from "firebase/app";
import { getDatabase, ref, push, set, onValue, get } from "firebase/database";

const SAD_EMOJI = [55357, 56864];
const HAPPY_EMOJI = [55357, 56832];
const NEUTRAL_EMOJI = [55357, 56848];

const firebaseConfig = {
  apiKey: "AIzaSyBLF-niHPCsUF3gmSsCSq4OCU10WMVI7uI",
  authDomain: "my-chat-app-ae081.firebaseapp.com",
  projectId: "my-chat-app-ae081",
  storageBucket: "my-chat-app-ae081.appspot.com",
  messagingSenderId: "605903191360",
  appId: "1:605903191360:web:906d519c41e11400becea5",
  measurementId: "G-PQQLPK3V0T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, 'messages');


class Chat extends Component {
  state = { chats: [] };

  componentDidMount() {
    this.retrieveMessages((messages) => {
      this.setState({ chats: messages });
    });
  }

  componentWillUnmount() {
  
  }

  handleKeyUp = (evt) => {
    const value = evt.target.value;
    if (evt.keyCode === 13 && !evt.shiftKey) {
      const { activeUser: user } = this.props;
      const chat = { user, message: value, timestamp: new Date().getTime() };
      evt.target.value = "";
      this.saveChatMessageToFirebase(db, chat);
    }
  };

  // You can add functions to interact with Firebase Firestore
  async retrieveMessages(callback) {
    onValue(messagesRef, (snapshot) => {
      const messages = [];
      if (snapshot.exists()) {
        // Iterate over the child nodes
        snapshot.forEach((childSnapshot) => {
          messages.push(childSnapshot.val());
        });
      }
      callback(messages);
    });
  }
  

// ...

async saveChatMessageToFirebase(db, chat) {
  try {
    const newMessageRef = push(messagesRef); // Create a new reference in the Realtime Database
    set(newMessageRef, chat); // Set the chat message at the reference
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

// ...


  // You can add functions to send chat messages to Firebase Firestore
  async sendMessage(user, message) {
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      user: user,
      message: message,
      timestamp: new Date().getTime(),
    });
  }

  // Your render function
  render() {
    // Render code here
    return (
      this.props.activeUser && (
        <Fragment>
          <div
            className="border-bottom border-gray w-100 d-flex align-items-center bg-white"
            style={{ height: 90 }}
          ><h2 className="text-dark mb-0 mx-4 px-2">
              {this.props.activeUser}
            </h2>
          </div>
          <div className="px-4 pb-4 w-100 d-flex flex-row flex-wrap align-items-start align-content-start position-relative" style={{ height: 'calc(100% - 180px)', overflowY: 'scroll' }}>
            {this.state.chats.map((chat, index) => {
              const previous = Math.max(0, index - 1);
              const previousChat = this.state.chats[previous];
              const position = chat.user === this.props.activeUser ? "right" : "left";
              const isFirst = previous === index;
              const inSequence = chat.user === previousChat.user;
              const hasDelay = Math.ceil((chat.timestamp - previousChat.timestamp) / (1000 * 60)) > 1;
              const mood = chat.sentiment > 0 ? HAPPY_EMOJI : (chat.sentiment === 0 ? NEUTRAL_EMOJI : SAD_EMOJI);
              return (
                <Fragment key={index}>
                  {(isFirst || !inSequence || hasDelay) && (
                    <div className={`d-flex ${position} font-weight-bold text-dark pb-1 px-1`} style={{ fontSize: '0.9rem' }}>
                      <span className="d-block" style={{ fontSize: '1.6rem' }}>
                        {String.fromCodePoint(...mood)}
                      </span>
                      <span>{chat.user || 'Anonymous'}</span>
                    </div>
                  )}
                  <ChatMessage message={chat.message} position={position} />
                </Fragment>
              );
            })}
          </div>
          <div
            className="border-top border-gray w-100 px-4 d-flex align-items-center bg-light"
            style={{ minHeight: 90 }}
          ><textarea
            className="form-control px-3 py-2"
            onKeyUp={this.handleKeyUp}
            placeholder="Enter a chat message"
            style={{ resize: "none" }}
          ></textarea>
          </div>
        </Fragment>
      )
    );
  }
}

export default Chat;
