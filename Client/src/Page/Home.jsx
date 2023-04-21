import "../App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  // Messages States
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");

  const sendMessage = () => {
    const data = {
      title: title,
      message: message,
      time: time,
    };
    socket.emit("send_message", { data });
  };

  return (
    <div className="container">
      <div className="form-group mb-2">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          placeholder="Your Title ..."
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div className="form-group mb-2">
        <label className="form-label">Message</label>
        <input
          className="form-control"
          placeholder="Your Message..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
      </div>
      <div className="form-group mb-2">
        <label className="form-label">Time to display</label>
        <input
          className="form-control"
          placeholder="Time in miliseconds"
          onChange={(event) => {
            setTime(event.target.value);
          }}
        />
      </div>
      <div className="form-group mt-4 d-flex justify-content-center">
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
