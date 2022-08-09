
var socket = io('http://localhost:8000', {transports: ['polling']});

// Get Dom element in js variables
const form  = document.getElementById('send_container');
const messageInput  = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('15953_download_mesg_ting_ringtone_apple_sms_ringtones.mp3');

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();    
      }
}

form.addEventListener('submit',(e)=>{
e.preventDefault();
const message = messageInput.value;
append(`You:${message}`,'right');
socket.emit('send',message);
messageInput.value = '';
});
const name = prompt("enter my name");
socket.emit('new-user-joined',name);
socket.on('user-joined',name =>{
    append(`${name} joined the chat`,'right');
});
socket.on('receive',data =>{
    append(`${data.name}:${data.message}`,'left');
});
socket.on('left',name =>{
    append(`${name} left the chat`,'right');
});

