import React from "react";
import styled from "styled-components";

import Stack from "../Stack";

const StyledInput = styled.input``;

const InputField = ({
  title,
  value,
  onChange,
  password,
  placeholder,
  error,
}) => {
  return (
    <Stack direction="column">
      <div>{title}</div>
      <StyledInput
        type={password ? "password" : "text"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
      {error}
    </Stack>
  );
};

export default InputField;
