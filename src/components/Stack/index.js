import styled from "styled-components";

const StyledStack = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  width: ${(props) => props.width || "100%"};
  margin-bottom: 10px;
  align-items: ${(props) => props.align || "center"};
  padding: ${(props) => props.padding};
  justify-content: ${(props) => props.justify || "center"};
`;

const Stack = ({ children, direction, align, justify, padding, width }) => {
  return (
    <StyledStack
      direction={direction}
      align={align}
      justify={justify}
      padding={padding}
      width={width}
    >
      {children}
    </StyledStack>
  );
};

export default Stack;
