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
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
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

  socket.on("startTimer", (data) => {
    socket.broadcast.emit("getTimer", data);
  });

  socket.on("pauseTimer", (data) => {
    socket.broadcast.emit("getPauseTimer", data);
  });
  socket.on("resumeTimer", (data) => {
    socket.broadcast.emit("getResumeTimer", data);
  });

  socket.on("resetTimer", (data) => {
    socket.broadcast.emit("getResetTimer", data);
  });
  
  socket.on("send_time_data", (data) => {
    socket.broadcast.emit("get_time_data", data);
  });
  
});

server.listen(3000, () => {
  console.log("SERVER IS RUNNING");
});