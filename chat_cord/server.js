const path = require('path');

//server to setup socket.io
const http = require('http')

//creating a express server first
const express = require('express');

const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server)

//Set static folder 
app.use(express.static(path.join(__dirname, 'public')))

// Run when client connects 
io.on('connection' , socket => {
	console.log('New WS Connection...  ');

	socket.emit('message', 'Welcome to Chatcord!');

	//Broadcast when the user connects 

	socket.broadcast.emit('message', 'A user has joined the chat');

	//Runs when the client disconnects 
	socket.on('disconnect', ()=>{
		io.emit('message','A user has left the chat');


	});



});


const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));  

