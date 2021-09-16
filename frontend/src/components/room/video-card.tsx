import React, { useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import { expandScreen } from '../../helpers/room';
import { VideoWrapper, Username, VideoCardContainer } from './video-card.styles';
const VideoCard = ({ peer, size }: { peer: Peer; size: string }) => {
  const ref: any = useRef();

  useEffect(() => {
    peer.on('stream', (stream: MediaStream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return (
    <VideoCardContainer onClick={expandScreen}>
      <VideoWrapper ref={ref} autoPlay playsInline size={size} />
      <Username>{peer.userName}</Username>
    </VideoCardContainer>
  );
};

export default VideoCard;
