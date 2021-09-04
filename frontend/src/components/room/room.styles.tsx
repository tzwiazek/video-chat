import styled from "styled-components";

export const VideoPlayerWrapper = styled.div<any>`
  width:100%;
  height:calc(100% - 102px);
  display:flex;
  justify-content:center;
  align-items:center;
  position:relative;

  ${({ splitScreen }: { splitScreen: number }) => splitScreen === 3 ? (`
    flex-wrap:wrap;
    margin-top:10px;
    height:calc(100% - 112px);
  `) : splitScreen === 2 ? (`
    margin:0 10px;
    width:calc(100% - 20px);
  `) : (``)}
`;

export const ParticipantList = styled.div<any>`
  position:absolute;
  bottom:50px;
  left:0px;
  display:flex;
  width:100%;
  height:30%;
  justify-content:center;
  transition:all 0.5s ease;

  ${({ displayChat }) => displayChat && `
    width:80%;
  `}
`;

export const ErrorContainer = styled.div`
  width:400px;
  height:100px;
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  margin:auto;
  display:flex;
  justify-content:center;
  align-items:center;
  color:var(--mainTextColor);
`;