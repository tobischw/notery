import io from 'socket.io-client';
import Cookies from 'js-cookie';

const socket = io('http://localhost:5000', {query: {token: Cookies.get('jwt')}});

export default socket;
