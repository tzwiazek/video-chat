import styled from "styled-components";

export const VideoCardContainer = styled.div`
  position:relative;
  width:350px;
  margin:0 10px;
`;

export const VideoWrapper = styled.video<any>`
  display:block;
  width:100%;
  height:100%;
  background:var(--backgroundIconColor);
  border:1px solid var(--borderIconColor);
  border-radius:12px;
  position:relative;
  object-fit:fill;

  ${({ size }: {size: string}) => size === 'fullscreen' ? (`
    width:calc(100% - 35px);
    height:calc(100% - 35px);
    margin:0 18px;
  `) : size === 'splitscreen' ? (`
    width:100%;
    height:100%;
  `) : (``)}
`;

export const Username = styled.div<any>`
  position:absolute;
  bottom:25px;
  left:25px;
  padding:12px 16px;
  background:rgba(0,0,0,0.4);
  border-radius:12px;
  color:var(--mainTextColor);
  font-family:'Open Sans', sans-serif;
  font-size:14px;
  letter-spacing:0.5px;
  display:flex;
  align-items:center;
  pointer-events:none;
`;