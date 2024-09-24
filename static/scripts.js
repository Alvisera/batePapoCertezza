function getRandomColor() {
  const colors = ['#4CAF50', '#2196F3', '#FF5722', '#9C27B0', '#FFEB3B', '#E91E63'];
  return colors[Math.floor(Math.random() * colors.length)];
}

const userColor = getRandomColor();

const messageInput = document.getElementById('message');
const sendButton = document.getElementById('sendButton');
const messages = document.getElementById('messages');

var socket = io.connect('http://172.16.20.104:5500');
socket.on('message', function(msg) {
  var chat = document.getElementById('chat-window');
  var p = document.createElement('li');
  
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, '0');
  var minutes = now.getMinutes().toString().padStart(2, '0');
  var timeString = `${hours}:${minutes}`;
  
  p.innerHTML = `<span style="color: ${msg.color};">${msg.user}</span> [${timeString}]: ${msg.text}`;
  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight;
});

function sendMessage() {
  var messageInput = document.getElementById('message');
  var message = messageInput.value;
  if (message) {
      socket.send({ text: message, color: userColor, user: username}); 
      messageInput.value = '';
  }
}

messageInput.addEventListener('keypress', function(event) {
if (event.key === 'Enter') {
    event.preventDefault();  
    sendMessage();          
}
});
