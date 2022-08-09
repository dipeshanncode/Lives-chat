const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const io = require("socket.io")(8000, {
    cors: {
        origin: '*',
      }
  });

const users = {};
io.on('connection',socket =>{
 socket.on('new-user-joined',name =>{
    users[socket.id] = name ;
    socket.broadcast.emit('user-joined',name);
 });
 socket.on('send',message =>{
    socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
 })
 socket.on('disconnect',message =>{
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id];
 })
});
const port = process.env.PORT || 8000
app.listen(port, 'localhost');
console.log('Server running at http://localhost:8000/');