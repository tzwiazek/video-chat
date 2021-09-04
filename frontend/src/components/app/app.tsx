import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from '../../assets/styles/globalStyles.styles';
import { CreateRoutes } from '../../shared/routes';
import Header from '../header/header';
import LeftSidebar from '../left-sidebar/left-sidebar';
import { VideoChatWrapper, VideoChatContainer } from './app.styles';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <VideoChatWrapper>
          <LeftSidebar />
          <VideoChatContainer>
            <Header />
            <CreateRoutes />
          </VideoChatContainer>
        </VideoChatWrapper>
      </BrowserRouter>

      <GlobalStyle />
    </>
  );
}

export default App;
