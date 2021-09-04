import styled from "styled-components";

export const VideoSettingsWrapper = styled.div`
  width:100%;
  height:100px;
  background:var(--mainBackgroundColor);
  display:-webkit-box;
  border-top:1px solid var(--mainLineColor);
`;

export const VideoSettingsContainer = styled.div`
  width:40%;
  height:100%;
  display:flex;
  justify-content:space-evenly;
  align-items:center;
`;

export const VideoSettingsEndMeetingContainer = styled.div`
  width:20%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
`;

export const Button = styled.button`
  background:var(--activeMeetingButton);
  padding:16px 30px;
  border-radius:12px;
  outline:none;
  color:var(--mainTextColor);
  border:1px solid var(--borderIconColor);
  cursor:pointer;
  letter-spacing:0.5px;
  font-size:14px;
  font-weight:400;
  font-family:'Open Sans', sans-serif;
`;

export const IconContainer = styled.div`
  width:28%;
  height:50px;
  background:var(--backgroundIconColor);
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:12px;
  cursor:pointer;
  border:1px solid var(--settingsLineColor);
`;

export const Icon = styled.img<any>`
  padding-right:16px;
  height:${({ height }) => (height || 25) + 'px'};
  width:${({ width }) => (width || 25) + 'px'};
`;

export const IconDescription = styled.div<any>`
  width:${({ width }) => (width || 45) + '%'};
  color:var(--settingsTextColor);
  display:flex;
  justify-content:center;
  align-items:center;
`;

