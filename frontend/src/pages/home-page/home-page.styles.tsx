import styled from "styled-components";

export const HomePageWrapper = styled.div`
  width:calc(100vw - 102px);
  height:calc(100vh - 102px);
  display:flex;
  justify-content:center;
  align-items:center;
`;

export const HomePageContainer = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-evenly;;
  flex-wrap:wrap;
  flex-direction:column;
  margin-top:-102px;
`;

export const Title = styled.h1`
  color:var(--mainTextColor);
`;

export const InputContainer = styled.div`
  width:100%;
  margin-bottom:20px;
`;

export const Input = styled.input`
  width:150px;
  height:35px;
  margin-left:15px;
  padding-left:10px;
  outline:none;
  border:none;
  border-radius:5px;
`;

export const Button = styled.button`
  width:100%;
  height:40px;
  margin-top:15px;
  outline:none;
  border:none;
  border-radius:15px;
  color:var(--mainTextColor);
  background:var(--backgroundIconColor);
  font-size:14px;
  letter-spacing:0.5px;
  cursor:pointer;
  transition:0.7s;

  &:hover {
    background:var(--activeVideoCamera);
    transition:0.4s;
  }
`;

export const Error = styled.div`
  margin-top:10px;
  font-size:20px;
  color:#e85a71;
`;