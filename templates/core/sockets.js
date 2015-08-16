/*
 *	SOCKETS
 */

module.exports = function(socket){
	console.log("connected");

	socket.on('disconnect', function(){
		console.log("disconnected")
	})
}

/*

Server-side

socket.broadcast.emit(event) // send everyone except for that socket
socket.on(event, fn)
socket.emit(event)

*//*

Client-side

html
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect('http://localhost');
  // socket.on(event, fn);
  // socket.emit(event);
</script>

jade
script(src="/socket.io/socket.io.js")
script var socket = io.connect('http://localhost:3000');

*/