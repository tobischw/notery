import io from 'socket.io-client';
import Cookies from 'js-cookie';

const socket = io('http://localhost:5000', {query: {token: Cookies.get('jwt')}, autoConnect: true});

export function reconnect(token) {
    const socket = io('http://localhost:5000', {query: {token: token}, autoConnect: true});
}

socket.on('connect', () => {
    console.log('Connected to server!')
})

socket.on('reconnect', () => {
    console.log('Reconnected to server!')
})

socket.on('error', (err) => {
    console.log(err);
})
export default socket;
