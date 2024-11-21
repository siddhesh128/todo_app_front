import React from "react";
import styled from "styled-components";
import { RegisterContainerProps } from "../../interface/Auth";

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
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Optional: add a shadow for better visibility
  border-radius: 8px; // Optional: add border-radius for rounded corners
`;

const RegisterContainer: React.FC<RegisterContainerProps> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default RegisterContainer;
