import styled from 'styled-components';

export const VideoChatWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: var(--mainBackgroundColor);
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
`;

export const VideoChatContainer = styled.div<any>`
  width: calc(100% - 102px);
  height: calc(100% - 102px);
  display: flex;
  flex-wrap: wrap;
`;
