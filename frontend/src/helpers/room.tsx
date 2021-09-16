import socket from 'src/socket';
import Peer from 'simple-peer';

export const createPeer = (userId: string, caller: string, stream: MediaStream, roomID: string) => {
  const peer: Peer = new Peer({
    initiator: true,
    trickle: false,
    stream
  });

  peer.on('signal', (signal: any) => {
    socket.emit('VIDEO-call-user', {
      userToCall: userId,
      userID: caller,
      signal,
      roomID
    });
  });
  peer.on('disconnect', () => {
    peer.destroy();
  });

  return peer;
};

export const addPeer = (signal: any, userID: string, stream: MediaStream) => {
  const peer: Peer = new Peer({
    initiator: false,
    trickle: false,
    stream
  });

  peer.on('signal', (signal: any) => {
    socket.emit('VIDEO-accept-call', { signal, to: userID });
  });

  peer.on('disconnect', () => {
    peer.destroy();
  });

  peer.signal(signal);
  return peer;
};

export const findPeer = (id: string, peersRef: any): Peer => {
  return peersRef.current.find((peer: Peer) => peer.peerID === id);
};

export const expandScreen = (event: any) => {
  if (event.target.requestFullscreen) {
    event.target.requestFullscreen();
  } else if (event.target.mozRequestFullScreen) {
    event.target.mozRequestFullScreen();
  } else if (event.target.webkitRequestFullscreen) {
    event.target.webkitRequestFullscreen();
  } else if (event.target.msRequestFullscreen) {
    event.target.msRequestFullscreen();
  }
};

export const goToBack = (event: Event) => {
  event.preventDefault();
  sessionStorage.removeItem('user');
  window.location.href = '/';
};
