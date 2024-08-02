import express from "express";
//import { createRequestHandler } from '@remix-run/express';
import http from "http";
import { Server } from "socket.io";
//import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

//const BUILD_DIR = path.join(process.cwd(), 'build');

app.use(express.static("public"));
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

io.on("connection", (socket) => {
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
    //socket.to(roomId).emit('message', `User has joined the room: ${roomId}`);
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`User left room: ${roomId}`);
    //socket.to(roomId).emit('message', `User has left the room: ${roomId}`);
  });

  socket.on("message-client", ({ roomId, message }) => {
    console.log("User sends message: ", message);
    console.log("to room: ", roomId);
    io.to(roomId).emit("message-server", { roomId, message });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
