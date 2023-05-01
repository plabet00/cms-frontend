import styled from "styled-components";
import { backgroundColor } from "./consts/colors";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${backgroundColor};
  height: 100vh;
`;
