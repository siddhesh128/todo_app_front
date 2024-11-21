import React from "react";
import { LOGIN } from "../../constants/labels";
import { HeaderLabel } from "../../styles/form.style";

const LoginHeader: React.FC = () => {
  return <HeaderLabel style={{ fontSize: '2rem' }}>{LOGIN}</HeaderLabel>; // Increase font size
};

export default LoginHeader;
