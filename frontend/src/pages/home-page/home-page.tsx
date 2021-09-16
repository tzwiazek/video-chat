import React, { useRef, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  Button,
  HomePageContainer,
  HomePageWrapper,
  Input,
  InputContainer,
  Title,
  Error
} from './home-page.styles';
import socket from '../../socket';

const HomePage = ({ history }: { history: RouteComponentProps['history'] }) => {
  const roomIDRef: any = useRef();
  const userNameRef: any = useRef();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    socket.on('VIDEO-error', (error: { error: string }) => {
      setError(error.error);
    });

    socket.on('VIDEO-response', () => {
      const roomID: string = roomIDRef.current.value;
      const userName: string = userNameRef.current.value;

      sessionStorage.setItem('user', userName);
      history.push(`/room/${roomID}`);
    });
  }, [history]);

  const joinToRoomHandler = () => {
    const roomID: string = roomIDRef.current.value;
    const userName: string = userNameRef.current.value;

    socket.emit('VIDEO-check-user', { roomID, userName });
  };

  return (
    <>
      <HomePageWrapper>
        <HomePageContainer>
          <Title>Join to room</Title>
          <InputContainer>
            <Input type="text" id="roomName" ref={roomIDRef} placeholder="Room name" />
          </InputContainer>
          <InputContainer>
            <Input type="text" id="userName" ref={userNameRef} placeholder="User name" />
          </InputContainer>

          <Button onClick={joinToRoomHandler}>Join</Button>
          {error && <Error>{error}</Error>}
        </HomePageContainer>
      </HomePageWrapper>
    </>
  );
};

export default HomePage;
