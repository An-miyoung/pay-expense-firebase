import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ServiceLogo } from "./shared/ServiceLogo";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseTable from "./ExpenseTable";
import SettlementSummary from "./SettlementSummary";
import { groupNameState } from "../states/groupName";
import { useGroupData } from "../hooks/useGroupData";

// import CenteredOverlayForm from "./shared/CenteredOverlayForm";

const ExpenseMain = () => {
  useGroupData();
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={5} md={4}>
          <LeftPane />
        </Col>
        <Col>
          <RightPane />
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseMain;

const LeftPane = () => {
  return (
    <Container>
      <StyledLeftPaneGapRow>
        <Row>
          <ServiceLogo />
        </Row>
        <Row>
          <AddExpenseForm />
        </Row>
        <Row>
          <SettlementSummary />
        </Row>
      </StyledLeftPaneGapRow>
    </Container>
  );
};

const RightPane = () => {
  const groupName = useRecoilValue(groupNameState);
  return (
    <StyledRightPaneContainer>
      <Row>
        <StyledTitle>{groupName || "그룹 이름"}</StyledTitle>
      </Row>
      <Row>
        <ExpenseTable />
      </Row>
    </StyledRightPaneContainer>
  );
};

const StyledRightPaneContainer = styled(Container)`
  padding: 100px 31px;
`;

const StyledTitle = styled.h2`
  text-align: center;
  margin-bottom: 80px;
  font-weight: 700;
  font-size: 48px;
  line-height: 48px;
  letter-spacing: 0.25px;
`;

const StyledLeftPaneGapRow = styled(Row)`
  gap: 5vh;
  padding-top: 100px;
  justify-content: center;
`;
