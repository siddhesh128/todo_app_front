import React from "react";
import RegisterForm from "../components/Register/RegisterForm";
import RegisterHeader from "../components/Register/RegisterHeader";
import RegisterContainer from "../components/Register/RegisterContainer";
import Carousel from "../components/common/Carousel/Carousel";

const Register: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh", fontSize: "1.2rem" }}>
      <div style={{ flex: 1 }}>
        <Carousel />
      </div>
      <div style={{ flex: 1.2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <RegisterContainer>
          <RegisterHeader />
          <RegisterForm />
        </RegisterContainer>
      </div>
    </div>
  );
};

export default Register;
