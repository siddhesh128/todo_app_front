import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import LoginHeader from "../components/Login/LoginHeader";
import LoginContainer from "../components/Login/LoginContainer";
import Carousel from "../components/common/Carousel/Carousel";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("token");

    if (isAuthenticated) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1.5 }}> {/* Increase flex size */}
        <Carousel />
      </div>
      <div style={{ flex: 1.2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {/* Increase flex size */}
        <LoginContainer>
          <ToastContainer position="top-right" autoClose={3000} />
          <LoginHeader />
          <LoginForm />
        </LoginContainer>
      </div>
    </div>
  );
};

export default Login;
