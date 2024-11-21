import React from "react";
import { REGISTER } from "../../constants/labels";
import { HeaderLabel } from "../../styles/form.style";

const RegisterHeader: React.FC = () => {
  return <HeaderLabel style={{ fontSize: "2rem" }}>{REGISTER}</HeaderLabel>;
};

export default RegisterHeader;
