import React, { useState, useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import socket from '../../socket';
import Chat from '../chat/chat';
import { ErrorContainer, ParticipantList, VideoPlayerWrapper } from './room.styles';
import VideoCard from './video-card';
import { VideoWrapper } from './video-card.styles';
import {
  userInfoInterface,
  userVideoAudioInterface
} from 'src/shared/interfaces/user-info.interface';
import { RouteComponentProps } from 'react-router-dom';
import { addPeer, createPeer, expandScreen, findPeer, goToBack } from '../../helpers/room';
import VideoSettings from './room-settings';

const Room = ({ match }: RouteComponentProps<{ roomID?: string }>) => {
  const currentUser: string = sessionStorage.getItem('user')!;
  const roomID: string = match.params.roomID!;
  const [peers, setPeers] = useState<Peer>([]);
  const [, setUserVideoAudio] = useState<userVideoAudioInterface>({
    localUser: { video: true, audio: true }
  });
  const [displayChat, setDisplayChat] = useState<boolean>(false);
  const [screenShare, setScreenShare] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const peersRef: any = useRef([]);
  const userVideoRef: any = useRef();
  const screenTrackRef: any = useRef();
  const userStream: any = useRef();

  useEffect(() => {
    window.addEventListener('popstate', goToBack);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream: MediaStream) => {
        userVideoRef.current.srcObject = stream;
        userStream.current = stream;

        socket.emit('VIDEO-join-room', { roomID, userName: currentUser });
        socket.on('VIDEO-user-join', (users: { data: userInfoInterface[] }) => {
          const peers: Peer = [];
          users.data.forEach((user: userInfoInterface) => {
            const { userName, video, audio } = user;
            const userID = user.socket;

            if (userName !== currentUser) {
              const peer: Peer = createPeer(userID, socket.id, stream, roomID);

              peer.userName = userName;
              peer.peerID = userID;

              peersRef.current.push({
                peerID: userID,
                peer,
                userName
              });
              peers.push(peer);

              setUserVideoAudio((preList: userVideoAudioInterface) => {
                return {
                  ...preList,
                  [peer.userName]: { video, audio }
                };
              });
            }
          });
          setPeers(peers);
        });

        socket.on(
          'VIDEO-receive-call',
          ({
            signal,
            userID,
            info
          }: {
            signal: any;
            userID: string;
            info: userInfoInterface[];
          }) => {
            const peerIdx = findPeer(userID, peersRef);

            if (!peerIdx) {
              const userInfo = info.find(
                (userInfo: userInfoInterface) => userInfo.socket === userID
              ) as userInfoInterface;
              const { userName, video, audio } = userInfo;

              const peer: Peer = addPeer(signal, userID, stream);
              peer.userName = userName;
              peersRef.current.push({
                peerID: userID,
                peer,
                userName
              });
              setPeers((users: Peer) => {
                return [...users, peer];
              });
              setUserVideoAudio((preList: userVideoAudioInterface) => {
                return {
                  ...preList,
                  [peer.userName]: { video, audio }
                };
              });
            }
          }
        );

        socket.on(
          'VIDEO-call-accepted',
          ({ signal, answerID }: { signal: any; answerID: string }) => {
            const peerIdx: Peer = findPeer(answerID, peersRef);
            peerIdx.peer.signal(signal);
          }
        );
      })
      .catch(() => {
        setError('Device not found');
      });

    socket.on(
      'VIDEO-toggle-camera',
      ({ userID, switchTarget }: { userID: string; switchTarget: any }) => {
        const peerIdx: Peer = findPeer(userID, peersRef);

        setUserVideoAudio((preList: userVideoAudioInterface) => {
          let video: boolean = preList[peerIdx.userName].video;
          let audio: boolean = preList[peerIdx.userName].audio;

          if (switchTarget === 'video') video = !video;
          else audio = !audio;

          return {
            ...preList,
            [peerIdx.userName]: { video, audio }
          };
        });
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [currentUser, roomID]);

  const toggleCameraAudio = (event: any) => {
    const target: any = event.target.getAttribute('data-switch');

    setUserVideoAudio((preList: userVideoAudioInterface) => {
      let videoSwitch = preList['localUser'].video;
      let audioSwitch = preList['localUser'].audio;

      if (target === 'video') {
        const userVideoTrack = userVideoRef.current.srcObject.getVideoTracks()[0];
        videoSwitch = !videoSwitch;
        userVideoTrack.enabled = videoSwitch;
      } else {
        const userAudioTrack = userVideoRef.current.srcObject.getAudioTracks()[0];
        audioSwitch = !audioSwitch;

        if (userAudioTrack) {
          userAudioTrack.enabled = audioSwitch;
        } else {
          userStream.current.getAudioTracks()[0].enabled = audioSwitch;
        }
      }

      return {
        ...preList,
        localUser: { video: videoSwitch, audio: audioSwitch }
      };
    });
  };

  const clickScreenSharing = () => {
    if (!screenShare) {
      navigator.mediaDevices.getDisplayMedia().then((stream: MediaStream) => {
        const screenTrack: MediaStreamTrack = stream.getTracks()[0];

        peersRef.current.forEach(({ peer }: { peer: Peer }) => {
          peer.replaceTrack(
            peer.streams[0].getTracks().find((track: MediaStreamTrack) => track.kind === 'video'),
            screenTrack,
            userStream.current
          );
        });

        screenTrack.onended = () => {
          peersRef.current.forEach(({ peer }: { peer: Peer }) => {
            peer.replaceTrack(
              screenTrack,
              peer.streams[0].getTracks().find((track: MediaStreamTrack) => track.kind === 'video'),
              userStream.current
            );
          });
          userVideoRef.current.srcObject = userStream.current;
          setScreenShare(false);
        };

        userVideoRef.current.srcObject = stream;
        screenTrackRef.current = screenTrack;
        setScreenShare(true);
      });
    } else {
      screenTrackRef.current.onended();
    }
  };

  return (
    <>
      {!error ? (
        <>
          <VideoPlayerWrapper splitScreen={peers.length + 1}>
            <VideoWrapper
              onClick={expandScreen}
              ref={userVideoRef}
              muted
              autoPlay
              playsInline
              size={'fullscreen'}
            />

            {peers && (
              <ParticipantList displayChat={displayChat}>
                {peers &&
                  peers.map((peer: Peer, index: number) => (
                    <VideoCard key={index} peer={peer} size={'mini'} />
                  ))}
              </ParticipantList>
            )}
            <Chat display={displayChat} roomID={roomID} />
          </VideoPlayerWrapper>
          <VideoSettings
            clickScreenSharing={clickScreenSharing}
            clickChat={() => setDisplayChat(!displayChat)}
            goToBack={goToBack}
            toggleCameraAudio={toggleCameraAudio}
          />
        </>
      ) : (
        <ErrorContainer>{error}</ErrorContainer>
      )}
    </>
  );
};

export default Room;
