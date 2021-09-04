import styled from "styled-components";

export const ChatContainer = styled.div`
  display:flex;
  flex-direction:column;
  width:25%;
  height:100%;
  background:var(--mainBackgroundColor);
  border-left:1px solid var(--mainLineColor);
  transition:all 0.5s ease;
  overflow:hidden;
`;

export const TopHeader = styled.div`
  margin:15px 0 0 15px;
  width:100%;
  font-weight:600;
  font-size:20px;
  color:var(--mainTextColor);
`;

export const ChatArea = styled.div`
  width:100%;
  height:100%;
  overflow-x:hidden;
  overflow-y:auto;
`;

export const MessageList = styled.div`
  display:flex;
  width:100%;
  flex-direction:column;
  padding:15px;
  color:var(--settingsTextColor);
`;

export const Message = styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  font-size:16px;
  margin-top:15px;
  margin-left:15px;
  text-align:left;

  > span {
    margin-left:3px;
  }

  > p {
    max-width:65%;
    width:auto;
    padding:9px;
    margin-top:3px;
    border:1px solid var(--settingsLineColor);
    border-radius:15px;
    box-shadow:0px 0px 3px #4ea1d3;
    font-size:14px;
  }
`;

export const UserMessage = styled.div`
  display:flex;
  flex-direction:column;
  align-items:flex-end;
  width:100%;
  font-size:16px;
  margin-top:15px;
  text-align:right;

  > span {
    margin-right:35px;
  }

  > p {
    max-width:65%;
    width:auto;
    padding:9px;
    margin-top:3px;
    margin-right:30px;
    border:1px solid var(--settingsLineColor);
    border-radius:15px;
    background:var(--backgroundIconColor);
    color:var(--mainTextColor);
    font-size:14px;
    text-align:left;
  }
`;

export const BottomInput = styled.input`
  bottom:0;
  width:100%;
  height:8%;
  padding:15px;
  box-sizing:border-box;
  opacity:0.7;
  background:var(--mainBackgroundColor);
  border:0;
  border-top:1px solid var(--mainLineColor);
  border-left:1px solid var(--mainLineColor);
  color:var(--mainTextColor);

  :focus {
    outline:none;
  }
`;