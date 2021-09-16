import React, { useState } from 'react';
import {
  Button,
  Icon,
  IconContainer,
  IconDescription,
  VideoSettingsContainer,
  VideoSettingsEndMeetingContainer,
  VideoSettingsWrapper
} from './room-settings.styles';
import micIcon from '../../assets/images/unmute-mic.svg';
import muteMicIcon from '../../assets/images/mute-mic.svg';
import videoCameraIcon from '../../assets/images/video-camera.svg';
import noVideoCameraIcon from '../../assets/images/no-video-camera.svg';
import participantsIcon from '../../assets/images/contact.svg';
import chatIcon from '../../assets/images/chat-on.svg';
import chatNewMessageIcon from '../../assets/images/chat-off.svg';

const VideoSettings = ({ clickChat, goToBack, toggleCameraAudio, clickScreenSharing }) => {
  const [isMuteMic, setMuteMic] = useState<boolean>(false);
  const [isVideoCameraVisible, setSideoCameraVisible] = useState<boolean>(false);
  const [isChatVisible, setChatVisible] = useState<boolean>(false);

  const cameraAudioHandler = (event: React.MouseEvent<HTMLElement>) => {
    (event.target as any).setAttribute('data-switch', 'audio');
    setMuteMic(!isMuteMic);
    toggleCameraAudio(event);
  };

  const cameraVideoHandler = (event: React.MouseEvent<HTMLElement>) => {
    (event.target as any).setAttribute('data-switch', 'video');
    setSideoCameraVisible(!isVideoCameraVisible);
    toggleCameraAudio(event);
  };

  const chatHandler = () => {
    setChatVisible(!isChatVisible);
    clickChat();
  };

  return (
    <VideoSettingsWrapper>
      <VideoSettingsContainer>
        <IconContainer onClick={cameraAudioHandler}>
          {isMuteMic ? (
            <>
              <Icon src={micIcon} />
              <IconDescription width={35}>Active</IconDescription>
            </>
          ) : (
            <>
              <Icon src={muteMicIcon} />
              <IconDescription width={35}>Muted</IconDescription>
            </>
          )}
        </IconContainer>

        <IconContainer onClick={cameraVideoHandler}>
          {isVideoCameraVisible ? (
            <>
              <Icon src={videoCameraIcon} />
              <IconDescription>Active</IconDescription>
            </>
          ) : (
            <>
              <Icon src={noVideoCameraIcon} />
              <IconDescription>Disabled</IconDescription>
            </>
          )}
        </IconContainer>
      </VideoSettingsContainer>

      <VideoSettingsEndMeetingContainer>
        <Button onClick={goToBack}>End Meeting</Button>
      </VideoSettingsEndMeetingContainer>
      <VideoSettingsContainer>
        <IconContainer onClick={clickScreenSharing}>
          <Icon width={30} height={30} src={participantsIcon} />
          <IconDescription width={50}>Share screen</IconDescription>
        </IconContainer>

        <IconContainer onClick={chatHandler}>
          {isChatVisible ? (
            <>
              <Icon src={chatNewMessageIcon} />
              <IconDescription>Active</IconDescription>
            </>
          ) : (
            <>
              <Icon src={chatIcon} />
              <IconDescription>Disabled</IconDescription>
            </>
          )}
        </IconContainer>
      </VideoSettingsContainer>
    </VideoSettingsWrapper>
  );
};

export default VideoSettings;
