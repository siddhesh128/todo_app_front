
import React from 'react';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 8px;
`;

const Spinner = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Loader: React.FC = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
);

export default Loader;