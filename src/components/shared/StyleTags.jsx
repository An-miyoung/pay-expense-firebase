import styled from "styled-components";
import { Container, Button, Row } from "react-bootstrap";

export const StyledCenteredContainer = styled(Container)`
  width: 60vw;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 10px;
`;

export const StyledH2 = styled.h2`
  font-weight: 700;
  line-height: 35px;
  text-align: right;
  overflow-wrap: break-word;
  word-break: keep-all;
`;

export const StyledSubmitButton = styled(Button).attrs({
  type: "submit",
})`
  width: 60%;
  height: 50px;
  margin: 0 auto;
  background: ${(props) => props.bgColor || "#6610f2"};
  border-radius: 8px;
  border: none;

  &:hover {
    background: #6610f2;
    filter: brightness(50%);
  }
`;

export const StyledRow = styled(Row)`
  height: 60vh;
  align-items: center;
  justify-content: center;
`;

export const StyledAddMemberErrorMsg = styled.span`
  color: red;
`;
