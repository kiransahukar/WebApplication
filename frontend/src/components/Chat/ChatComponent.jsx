import React, { useEffect, useState } from "react";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chat.css'; // Custom styles

const ChatComponent = ({ isVisible }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Initialize Pusher and Laravel Echo inside useEffect (runs when the component mounts)
  useEffect(() => {
    window.Pusher = Pusher;

    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'b6495944d03eed629be7',  // Your Pusher app key
      cluster: 'eu',                // Your Pusher app cluster
      forceTLS: true,               // Ensure you're using TLS
    });

    // Listen for the 'MessageSent' event on the 'chat' channel
    echo.channel('chat')
      .listen('MessageSent', (e) => {
        console.log('Message received:', e.message);
        // Add the received message to the message list
        setMessages((prevMessages) => [...prevMessages, { user: "Server", text: e.message }]);
      });

    // Cleanup the WebSocket connection when the component unmounts
    // return () => {
    //   echo.disconnect();
    // };
  }, []); // Empty dependency array means it runs once, when the component mounts

  const sendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, { user: "You", text: message }]);
      setMessage(""); // Clear input field after sending

      // You can also send the message to the server if needed, like this:
      fetch("http://localhost:8000/api/sendmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
    }
  };

  return (
    <div className={isVisible ? 'd-block' : 'd-none'}>
      <div className="container my-4">
        <div className="card chat-container">
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Chat Room</h5>
            <span className="settings-icon">&#9881;</span>
          </div>
          <div className="card-body chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-bubble ${
                  msg.user === "You"
                    ? "text-right bg-dark text-white ms-auto"
                    : "bg-light text-dark"
                } p-2 mb-2 rounded`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="card-footer">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="btn btn-dark" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
