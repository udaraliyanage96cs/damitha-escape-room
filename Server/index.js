const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);
let timeLeft = 300; // 5 minutes in seconds
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("add_time", (data) => {
    socket.broadcast.emit("receive_time", data);
  });

  console.log("Client connected");

  socket.emit("timeUpdate", timeLeft);

  socket.on("timeUpdate", (newTimeLeft) => {
    timeLeft = newTimeLeft;
    socket.broadcast.emit("timeUpdate", timeLeft);
  });

  socket.on("timeAdd", (amountInSeconds) => {
    timeLeft += amountInSeconds;
    io.emit("timeAdd", amountInSeconds);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  
});

server.listen(3000, () => {
  console.log("SERVER IS RUNNING");
});