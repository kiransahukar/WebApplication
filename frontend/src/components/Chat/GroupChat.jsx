
// import React, { useState, useEffect } from "react";
// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Chat.css';
// import axios from "axios";

// const GroupChat = ({ isVisible, groupId, currentUser }) => {
//   const [messages, setMessages] = useState([]); // State for storing messages
//   const [message, setMessage] = useState(""); // State for the current message input

//   groupId=1;
//   useEffect(() => {
//     // Fetch old messages when the component mounts
//     const fetchOldMessages = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/group-messages/${groupId}`);
//         console.log(response.data.data); // Log the response data for debugging
//         setMessages(response.data.data); // Set the messages state with the response
//       } catch (error) {
//         console.error('Failed to load old messages:', error); // Handle error
//       }
//     };

//     fetchOldMessages(); // Call the function to fetch messages

//     // Initialize Pusher and Laravel Echo
//     window.Pusher = Pusher;
//     const echo = new Echo({
//       broadcaster: 'pusher',
//       key: 'b6495944d03eed629be7', // Your Pusher app key
//       cluster: 'eu',               // Your Pusher cluster
//       forceTLS: true,              // Ensure you're using a secure connection
//     });

//     // Listen for new messages on the specific group chat channel
//     echo.channel(`group-chat.${groupId}`)
//       .listen('GroupMessageSent', (e) => {
//         console.log('New message received:', e); // Log received messages for debugging
//         // Update messages state when a new message is received
//         setMessages((prevMessages) => [...prevMessages, { user: e.user, text: e.message }]);
//       });

//     // Cleanup function to disconnect Pusher when the component unmounts
//     // return () => {
//     //   echo.disconnect();
//     // };
//   }, [groupId]); // Dependency array - runs effect when groupId changes

//   // Function to send a message
//   const sendMessage = async () => {
//     if (message.trim() !== "") { // Check if the message is not empty
//       // Optimistically update the UI
//       setMessages([...messages, { user: currentUser, text: message }]);

//       // Send the message to the server
//       await fetch(`http://localhost:8000/api/send-group-message`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ message, group_id: groupId, user: currentUser }),
//       });

//       setMessage(""); // Clear the input field after sending
//     }
//   };

//   return (
//     <div className={isVisible ? 'd-block' : 'd-none'}>
//       <div className="container my-4">
//         <div className="card chat-container">
//           <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
//             <h5 className="mb-0">Group Chat Room</h5>
//             <span className="settings-icon">&#9881;</span>
//           </div>
//           <div className="card-body chat-messages">
//             {messages.map((msg, index) => ( // Render each message
//               <div
//                 key={index}
//                 className={`chat-bubble ${
//                   msg.user === currentUser
//                     ? "text-right bg-dark text-white ms-auto"
//                     : "bg-light text-dark"
//                 } p-2 mb-2 rounded`}
//               >
//                 <strong>{msg.user}: </strong> {msg.text}
//               </div>
//             ))}
//           </div>
//           <div className="card-footer">
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Type a message..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)} // Update message state on input change
//               />
//               <button className="btn btn-dark" onClick={sendMessage}>
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GroupChat;
import React, { useState, useEffect } from "react";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chat.css';
import axios from "axios";

const GroupChat = ({ isVisible, groupId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(groupId || 1);

  useEffect(() => {
    const fetchOldMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/group-messages/${selectedGroup}`);
        setMessages(response.data.data);
      } catch (error) {
        console.error('Failed to load old messages:', error);
      }
    };

    fetchOldMessages();

    window.Pusher = Pusher;
    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'b6495944d03eed629be7',
      cluster: 'eu',
      forceTLS: true,
    });

    echo.channel(`group-chat.${selectedGroup}`)
      .listen('GroupMessageSent', (e) => {
        setMessages((prevMessages) => [...prevMessages, { user: e.user, text: e.message, time: new Date().toLocaleTimeString() }]);
      });

    return () => {
      echo.disconnect();
    };
  }, [selectedGroup]);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      setMessages([...messages, { user: currentUser, text: message, time: new Date().toLocaleTimeString() }]);

      await fetch(`http://localhost:8000/api/send-group-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, group_id: selectedGroup, user: currentUser }),
      });

      setMessage("");
    }
  };

  return (
    <div className={isVisible ? 'd-block' : 'd-none'}>
      <div className="container my-4">
        <div className="card chat-container">
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Group Chat Room</h5>
            <select
              className="form-select w-auto"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="1">Group 1</option>
              <option value="2">Group 2</option>
              <option value="3">Group 3</option>
            </select>
          </div>
          <div className="card-body chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-bubble ${
                  msg.user === currentUser
                    ? "text-right bg-dark text-white ms-auto"
                    : " bg-light text-dark ms-0 me-auto"
                } p-2 mb-2 rounded`}
              >
                <strong>{msg.user}: </strong> {msg.text}
                <div>
                  <small >{new Date(msg.createdAt).toLocaleString()}</small>
                </div>
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

export default GroupChat;
