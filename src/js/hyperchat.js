const socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');
var chatHistory = document.getElementById('chatList');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
});

socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    item.className = "incomingMessage"
    chatHistory.appendChild(item);
    chatHistory.scrollTo(0, chatHistory.scrollHeight);
});