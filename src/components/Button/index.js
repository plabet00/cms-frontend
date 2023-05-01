import React from "react";
import styled from "styled-components";

import { secondaryColor } from "../../consts/colors";

const StyledButton = styled.button`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border: none;
  padding: 10px;
  font-size: large;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
`;

const Button = ({
  onClick,
  children,
  backgroundColor = secondaryColor,
  color = "white",
  disabled,
}) => {
  return (
    <StyledButton
      backgroundColor={backgroundColor}
      color={color}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
