function getRandomColor() {
  const colors = ['#4CAF50', '#2196F3', '#FF5722', '#9C27B0', '#FFEB3B', '#E91E63'];
  return colors[Math.floor(Math.random() * colors.length)];
}

const userColor = getRandomColor();

const messageInput = document.getElementById('message');
const sendButton = document.getElementById('sendButton');
const messages = document.getElementById('messages');

var socket = io.connect('http://172.16.20.119:8080');
socket.on('message', function(msg) {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}`;
  const formattedMsg = `<span style="color: ${msg.color};">${msg.user}</span> (${timeString}): ${msg.text} 
  <button class="delete-btn">Excluir</button>`;
  
  addMessageToChat(formattedMsg);  
  saveMessages(); 
});

socket.on('deleteMessage', function(msgId) {
  const allMessages = document.querySelectorAll('#messages li');
  allMessages.forEach(message => {
      if (message.dataset.id === msgId) { 
          message.remove();
          saveMessages();  
      }
  });
});

function sendMessage() {
  var message = messageInput.value;
  if (message && username) {
      socket.send({ text: message, color: userColor, user: username });
      messageInput.value = '';  
  }
}

messageInput.addEventListener('keypress', function(event) {
if (event.key === 'Enter') {
    event.preventDefault();  
    sendMessage();          
}
});

document.getElementById('sendButton').addEventListener('click', function() {
  sendMessage();
});

window.addEventListener('beforeunload', function() {
  document.getElementById('loader').style.display = 'block'; 
  document.body.classList.add('fade'); 
});


window.addEventListener('load', function() {
  document.body.classList.add('fade-in');
  document.getElementById('loader').style.display = 'none'; 
});

function saveMessages() {
  const messageList = [];
  document.querySelectorAll('#messages li').forEach(li => {
      messageList.push(li.innerHTML);  
  });
  localStorage.setItem('chatMessages', JSON.stringify(messageList));
}

function loadMessages() {
  const savedMessages = localStorage.getItem('chatMessages');
  if (savedMessages) {
      const messages = JSON.parse(savedMessages);
      messages.forEach(msg => {
          addMessageToChat(msg);  
      });
  }
}

function addMessageToChat(msg) {
  var chat = document.getElementById('chat-window');
  var p = document.createElement('li');
  p.innerHTML = msg;
  chat.appendChild(p);

  var deleteButton = p.querySelector('.delete-btn');
  if (deleteButton) {
      deleteButton.addEventListener('click', function() {
          p.remove();
          saveMessages(); 
      });
  }

  chat.scrollTop = chat.scrollHeight;  
}

window.onload = function() {
  loadMessages();
};

document.getElementById('sendButton').addEventListener('click', function() {
  sendMessage();
});
