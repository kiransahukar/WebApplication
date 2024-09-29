import React, { useState, useEffect } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const PrivateChat = ({ userId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Initialize Pusher and Echo
    window.Pusher = Pusher;
    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'b6495944d03eed629be7',  // Your Pusher key
      cluster: 'eu',                // Your Pusher cluster
      forceTLS: true,
    });

    // Listen for private messages
    echo.private(`private-chat.${receiverId}`)
      .listen('PrivateMessageSent', (e) => {
        setMessages((prevMessages) => [...prevMessages, e.message]);
      });

    return () => {
      echo.disconnect();
    };
  }, [receiverId]);

  const sendMessage = async () => {
    await fetch('/send-private-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, receiver_id: receiverId }),
    });
    setMessage('');
  };

  return (
    <div>
      <h2>Private Chat with User {receiverId}</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default PrivateChat;
