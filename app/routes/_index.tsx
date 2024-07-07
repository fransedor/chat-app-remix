import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:3000");

export default function Index() {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
		console.log("sending message")
    socket.emit('sendMessage', message);
    setMessage('');
  };

  return (
    <div>
      <h1>Chat Application</h1>
      <div id="message-container">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
