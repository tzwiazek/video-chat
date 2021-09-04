import styled from "styled-components";

export const Menu = styled.div`
  width:100px;
  height:100%;
  border-right:2px solid var(--mainLineColor);
`;

export const IconWrapper = styled.div<any>`
  width:100px;
  height:100px;
  display:flex;
  justify-content:center;
  align-items:center;

  ${({ menuList }) => menuList && `
    height:50px;
    width:50px;
    margin:4px 18px;
    cursor:pointer;
    border-radius:100%;
    padding:8px;

    &:hover {
      background:var(--backgroundIconColor);
    }
  `}
`;

export const IconContainer = styled.div<any>`
  width:50%;
  height:50%;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:12px;
  cursor:pointer;
  
  ${({ activeVideoCamera }) => activeVideoCamera && `
    background:var(--activeVideoCamera);
  `}

  ${({ defaultIconBackground }) => defaultIconBackground && `
    background:var(--secondBackgroundIconColor);
    border:1px solid var(--borderIconColor);

    &:hover {
      background:var(--backgroundIconColor);
    }
  `}
`;

export const Icon = styled.img<any>`
  height:${({ height }) => (height || 25) + 'px'};
  width:${({ width }) => (width || 25) + 'px'};
`;

export const MainMenuContainer = styled.div`
  width:100%;
  height:calc(100vh - 250px);
  padding-top:50px;
`;