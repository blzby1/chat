const socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');
var chatHistory = document.getElementById('history');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
});

socket.on('chat message', function(msg) {
    var item = document.createElement('p');
    item.textContent = msg;
    item.className = "sentMessage"
    chatHistory.appendChild(item);
    chatHistory.scrollTo(0, chatHistory.scrollHeight);
});