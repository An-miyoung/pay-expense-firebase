import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ShareFill } from "react-bootstrap-icons";
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

  const handleSharing = () => {
    if (navigator.userAgent.match(/iPhone|Android/i) && navigator.share) {
      navigator.share({
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert(
          "공유 링크가 클립 보드에 복사 되었습니다. 그룹 멤버들과 공유해 보세요!"
        );
      });
    }
  };

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

      <StyledShareButton onClick={handleSharing}>
        <ShareFill />
      </StyledShareButton>
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

const StyledShareButton = styled.div`
  border-radius: 50%;
  background-color: #6b3da6;
  position: fixed;
  width: 55px;
  height: 55px;
  right: 40px;
  bottom: 45px;
  filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.25));
  color: white;
  font-size: 30px;
  text-align: center;
  svg {
    padding-right: 3px;
    padding-top: 3px;
  }
`;

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
