import React, { useEffect, useState, useRef, Dispatch } from 'react';
import socket from '../../socket';
import {
  ChatContainer,
  TopHeader,
  ChatArea,
  MessageList,
  Message,
  UserMessage,
  BottomInput
} from './chat.styles';

const Chat = ({ display, roomID }: { display: boolean; roomID: string }) => {
  const currentUser: string = sessionStorage.getItem('user')!;
  const [message, setMessage]: [any, Dispatch<React.SetStateAction<any>>] = useState([]);
  const messagesEndRef: any = useRef(null);
  const inputRef: any = useRef();

  useEffect(() => {
    socket.on(
      'CHAT-receive-message',
      ({ message, sender }: { message: string; sender: string }) => {
        setMessage((messages: string[]) => [...messages, { sender, message }]);
      }
    );
  }, []);

  useEffect(() => {
    scrollToLastMessage();
  }, [message]);

  const scrollToLastMessage = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = (event: any) => {
    if (event.key === 'Enter') {
      const message: string = event.target.value;

      if (message) {
        socket.emit('CHAT-send-message', { roomID, message, sender: currentUser });
        inputRef.current.value = '';
      }
    }
  };

  return (
    <ChatContainer className={display ? '' : 'hide-chat'}>
      <TopHeader>Chat</TopHeader>
      <ChatArea>
        <MessageList>
          {message &&
            message.map(
              ({ sender, message }: { sender: string; message: string }, index: number) => {
                if (sender !== currentUser) {
                  return (
                    <Message key={index}>
                      <span>{sender}</span>
                      <p>{message}</p>
                    </Message>
                  );
                } else {
                  return (
                    <UserMessage key={index}>
                      <span>{sender}</span>
                      <p>{message}</p>
                    </UserMessage>
                  );
                }
              }
            )}
          <div style={{ float: 'left', clear: 'both' }} ref={messagesEndRef} />
        </MessageList>
      </ChatArea>
      <BottomInput ref={inputRef} onKeyUp={sendMessage} placeholder="Enter your message" />
    </ChatContainer>
  );
};

export default Chat;
