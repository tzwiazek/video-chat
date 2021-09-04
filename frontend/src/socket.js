import io from 'socket.io-client';
const sockets = io('http://localhost:3080', { autoConnect: true, forceNew: true });
// const sockets = io('/');
export default sockets;
