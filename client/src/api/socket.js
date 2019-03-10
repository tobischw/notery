import io from 'socket.io-client';
import Cookies from 'js-cookie';

const local = "localhost";
const ip = "10.60.2.160";
    var socket = io('http://'+ local +':5000', {query: {token: Cookies.get('jwt')}});
    console.log('Disconnected: ' + socket.disconnected);


socket.on('connect', () => {
    console.log('Connected to server!')
})

socket.on('reconnecting', () => {
    console.log('Trying to reconnect')
    socket.io.opts.query = {
      token: Cookies.get('jwt')
    }
  });

socket.on('reconnect', () => {
    console.log('Reconnected to server!')
})

socket.on('error', (err) => {
    console.log(err);
    socket.disconnect();
})
export default socket;
