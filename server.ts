import express from 'express';
//import { createRequestHandler } from '@remix-run/express';
import http from 'http';
import {Server} from 'socket.io';
//import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//const BUILD_DIR = path.join(process.cwd(), 'build');

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('User has left');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
