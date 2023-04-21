import "../App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3000");

function App() {
  // Messages States
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");
  const [addTime, setAddTime] = useState("");

  const sendMessage = () => {
    const data = {
      title: title,
      message: message,
      time: time,
    };
    socket.emit("send_message", { data });
  };

  const addTimeHander = () => {
    console.log(addTime);
    socket.emit("timeAdd", { addTime });
  }

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
          placeholder="Time in Seconds"
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
      <div className="form-group mt-4 d-flex justify-content-center">
        <button className="btn btn-primary" onClick={sendMessage}>
          Start Timer
        </button>
      </div>
      <div className="row">
        <div className="col-lg-3">
          <div className="form-group mb-2">
            <label className="form-label">Add Time</label>
            <input
              type="number"
              className="form-control"
              placeholder="Time in Seconds"
              onChange={(event) => {
                setAddTime(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="col-lg-3 d-flex align-items-end">
          <div className="form-group mb-2">
            <button className="btn btn-primary" onClick={addTimeHander}>
              Add More Time
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
