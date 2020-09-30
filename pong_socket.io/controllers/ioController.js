class IoController {

   constructor() {
     }

     
     /**
      * socket.broadcast.emit will send to all connected sockets except the sender
      * socket.emit will send to all connected sockets
      */

   registerSocket(socket){
      socket.on('start', data => socket.broadcast.emit('start', data));
      socket.on('stop', data => socket.broadcast.emit('stop', data));
      socket.on('updatepaddle', data => socket.broadcast.emit('updatepaddle', data));
      socket.on('update', data => socket.broadcast.emit('update', data));
      socket.on('pointPlayer1', data => socket.broadcast.emit('pointPlayer1'));
      socket.on('pointPlayer2', data => socket.broadcast.emit('pointPlayer2'));
   }

}
module.exports = new IoController() ;
