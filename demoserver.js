import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import fs from 'node:fs';
import { match } from "assert";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

// get number of users connected to the chat app
const count = io.engine.clientsCount;

app.use('/', express.static("./src/css"));
app.use('/', express.static("./src/png"));

app.route('/').get((req, res) => {
  const container = fs.readFileSync('./src/html/fullscreencontainer.html');
  const chat = fs.readFileSync('./src/html/chat.html');

  const edited = container.toString().replace(/<!-- placeholder -->/, chat);

  res.send(edited);
});

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(8080);