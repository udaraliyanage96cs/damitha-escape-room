import io from "socket.io-client";
import { useEffect, useState, Fragment } from "react";

const socket = io.connect("http://localhost:3000");

export default function User() {
  const [messageReceived, setMessageReceived] = useState("");
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const [secondsLeft, setSecondsLeft] = useState(100);

  useEffect(() => {
    let timeout = 0;
    socket.on("receive_message", (data) => {
      setShowContent(true);
      console.log(data);
      setMessageReceived(data);
      setLoading(false);
      timeout = data.data.time * 1000
      setTimeout(() => {
        setShowContent(false);
      }, timeout);
    });
    socket.on("receive_time", (data) => {
      console.log(data.addTime)
      handleAddTime(10);
    });

  }, [socket]);


  useEffect(() => {
    socket.on("timeAdd", (amountInSeconds) => {
      console.log(amountInSeconds.addTime);
      setSecondsLeft((secondsLeft) => secondsLeft + parseInt(amountInSeconds.addTime));
    });
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const intervalId = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const handleAddTime = (amountInSeconds) => {
    console.log("aaaa")
    console.log(secondsLeft)
    setSecondsLeft((secondsLeft) => secondsLeft + amountInSeconds);
  };


  return (
    <div className="container">
      {!loading && (
        <div>
          {showContent && (
            <div>
              <div>
                <h5 className="display-text">{messageReceived.data.title}</h5>
              </div>
              <div className="display-text">{messageReceived.data.message}</div>
              <div className="display-text">{messageReceived.data.time * 1000}</div>
            </div>
          )}

        </div>
      )}
      <div className="display-text">
        <h1> {minutes}:{seconds < 10 ? "0" : ""}{seconds}</h1>
      </div>
    </div>
  );
}
