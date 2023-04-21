import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // change to your server URL

function Test() {
    const [secondsLeft, setSecondsLeft] = useState(300);

    useEffect(() => {
        if (secondsLeft <= 0) return;

        const intervalId = setInterval(() => {
            setSecondsLeft((secondsLeft) => secondsLeft - 1);
            socket.emit("timeUpdate", secondsLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [secondsLeft]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    const handleAddTime = (amountInSeconds) => {
        socket.emit("timeAdd", amountInSeconds);
    };

    useEffect(() => {
        socket.on("timeAdd", (amountInSeconds) => {
            setSecondsLeft((secondsLeft) => secondsLeft + amountInSeconds);
        });
    }, []);

    return (
        <div className="display-text">
            {minutes}:{seconds < 10 ? "0" : ""}{seconds}
            <button onClick={() => handleAddTime(60)}>Add 1 minute</button>
            <button onClick={() => handleAddTime(300)}>Add 5 minutes</button>
        </div>
    );
}

export default Test;
