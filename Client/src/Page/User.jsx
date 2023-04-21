import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

export default function User() {
  const [messageReceived, setMessageReceived] = useState("");
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setShowContent(true);
      console.log(data);
      setMessageReceived(data);
      setLoading(false);
      setTimeout(() => {
        setShowContent(false);
      }, data.data.time);
    });
  }, [socket]);

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
              <div className="display-text">{messageReceived.data.time}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
