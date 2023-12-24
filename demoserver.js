import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

// get number of users connected to the chat app
const count = io.engine.clientsCount;

app.use('/', express.static("./src/css"));
app.use('/', express.static("./src/png"));
app.use('/', express.static('./src/js'))

app.route('/').get((req, res) => {
  const container = fs.readFileSync('./src/html/fullscreencontainer.html');
  const chat = fs.readFileSync('./src/html/chat.html');

  const edited = container.toString().replace(/<!-- placeholder -->/, chat);

  res.setHeader("Content-Type", "text/html");
  res.send(edited);
});

app.route('/socket.io.js').get((req, res) => {
  res.sendFile(join(__dirname, '/node_modules/socket.io/client-dist/socket.io.js'));
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log(msg.toString())
    io.emit('chat message', msg);
  });
});

httpServer.listen(8080);