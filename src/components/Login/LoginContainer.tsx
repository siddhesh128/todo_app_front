import React from "react";
import styled from "styled-components";
import { LoginContainerProps } from "../../interface/Auth";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;  // Increase width
  height: 90%; // Increase height
  max-width: 700px; // Increase max-width
  max-height: 700px; // Increase max-height
  background-color: white;
  padding: 3rem; // Increase padding
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); // Increase box-shadow
  border-radius: 10px; // Increase border-radius
`;

const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default LoginContainer;
