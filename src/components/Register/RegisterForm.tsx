import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";
import AuthService from "../../services/auth.service";
import {
  REGISTER,
  USERNAME_LABEL,
  PASSWORD_LABEL,
} from "../../constants/labels";
import {
  USERNAME_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
} from "../../constants/placeholders";
import { ALREADY_REGISTERED } from "../../constants/messages";
import Container from "../common/Container/Container";
import { FormContainer, FormGroup, FormLabel } from "../../styles/form.style";
import Input from "../common/Input/Input";
import Loader from '../common/Loader/Loader';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await AuthService.handleRegister(
      e,
      username,
      password,
      setUsername,
      setPassword,
      navigate,
      setIsLoading
    );
  };

  return (
    <Container width="500px" height="500px">
      <FormContainer onSubmit={handleSubmit} style={{ fontSize: "1.2rem" }}>
        <FormGroup>
          <FormLabel>{USERNAME_LABEL}</FormLabel>
          <Input
            type="text"
            placeholder={USERNAME_PLACEHOLDER}
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            required
            style={{ fontSize: "1.2rem" }}
          />
          <FormLabel>{PASSWORD_LABEL}</FormLabel>
          <Input
            type="password"
            placeholder={PASSWORD_PLACEHOLDER}
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
            style={{ fontSize: "1.2rem" }}
          />
        </FormGroup>
        <Button
          type="submit"
          buttonStyle="primary"
          style={{ fontSize: "1.2rem" }}
          disabled={isLoading}
        >
          {REGISTER}
          {isLoading && <Loader />}
        </Button>
        <Button
          type="button"
          buttonStyle="success"
          onClick={() => navigate("/login")}
          style={{ fontSize: "1.2rem" }}
        >
          {ALREADY_REGISTERED}
        </Button>
      </FormContainer>
    </Container>
  );
};

export default RegisterForm;
