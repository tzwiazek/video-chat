import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  color:var(--mainTextColor);
`;

const PageContainer = styled.div`
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
`;

const ChatsPage = () => {
  return (
    <PageWrapper>
      <PageContainer>
        Subpage doesn't exist
      </PageContainer>
    </PageWrapper>
  );
}

export default ChatsPage;