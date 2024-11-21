import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";
import Input from "../common/Input/Input";
import { FormContainer, FormGroup, FormLabel } from "../../styles/form.style";
import AuthService from "../../services/auth.service";
import {
  LOGIN,
  REGISTER,
  USERNAME_LABEL,
  PASSWORD_LABEL,
} from "../../constants/labels";
import {
  USERNAME_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
} from "../../constants/placeholders";
import Container from "../common/Container/Container";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    AuthService.handleLogin(e, username, password, navigate);
  };

  return (
    <Container width="550px" height="550px"> {/* Increase container size */}
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>{USERNAME_LABEL}</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder={USERNAME_PLACEHOLDER}
            required
            style={{ fontSize: '1.5rem' }} // Increase input font size
          />
          <FormLabel>{PASSWORD_LABEL}</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder={PASSWORD_PLACEHOLDER}
            required
            style={{ fontSize: '1.5rem' }} // Increase input font size
          />
        </FormGroup>
        <Button type="submit" buttonStyle="primary" style={{ fontSize: '1.2rem' }}> {/* Decrease button font size */}
          {LOGIN}
        </Button>
        <Button
          type="button"
          buttonStyle="secondary"
          onClick={() => navigate("/register")}
          style={{ fontSize: '1.2rem' }} // Decrease button font size
        >
          {REGISTER}
        </Button>
      </FormContainer>
    </Container>
  );
};

export default LoginForm;
