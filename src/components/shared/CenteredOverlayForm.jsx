import React from "react";
import { Row, Form } from "react-bootstrap";
import { OverlayWrapper } from "./OverlayWrapper";
import {
  StyledCenteredContainer,
  StyledRow,
  StyledH2,
  StyledSubmitButton,
} from "./StyleTags";
import { ServiceLogo } from "./ServiceLogo";

const CenteredOverlayForm = ({ title, children, validated, handleSubmit }) => {
  return (
    <StyledCenteredContainer>
      <ServiceLogo />
      <div style={{ marginBottom: "0.8em" }} />
      <OverlayWrapper>
        <Form noValidate onSubmit={handleSubmit} validated={validated}>
          <StyledRow>
            <Row className="align-items-start">
              <StyledH2>{title}</StyledH2>
            </Row>
            <Row className="align-items-center">{children}</Row>
            <Row className="align-items-end">
              <StyledSubmitButton>저장</StyledSubmitButton>
            </Row>
          </StyledRow>
        </Form>
      </OverlayWrapper>
    </StyledCenteredContainer>
  );
};

export default CenteredOverlayForm;
