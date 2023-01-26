import React, { useEffect, useState, useCallback } from "react";
import "../firebase";
import { getDatabase, ref, update } from "firebase/database";
import { Col, Form, Row } from "react-bootstrap";
import { StyledSubmitButton } from "./shared/StyleTags";
import { useRecoilValue, useRecoilState } from "recoil";
import { groupIdState } from "../states/groupId";
import { expensesState } from "../states/expenses";
import { groupMembersState } from "../states/groupMembers";
import styled from "styled-components";

const AddExpenseForm = () => {
  const [validated, setValidated] = useState(false);
  const groupId = useRecoilValue(groupIdState);
  const groupMembers = useRecoilValue(groupMembersState);
  const [expense, setExpense] = useRecoilState(expensesState);
  // TODO: 입력된 값중 검증된 값은 유지하기 위해 tempExpenseState 사용

  // jest 검증을 위한 state
  const [isDescValid, setIsDescValiid] = useState(false);
  const [isAmountValid, setIsAmountValid] = useState(false);
  const [isPayerValid, setIsPayerValid] = useState(false);
  const [inputPassed, setInputPassed] = useState(false);

  // 비용을 받을 state
  const now = new Date();
  const [date, setDate] = useState(
    [
      now.getFullYear(),
      `0${now.getMonth() + 1}`.slice(-2),
      `0${now.getDate()}`.slice(-2),
    ].join("-")
  );

  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [payer, setPayer] = useState(null);

  // bootstrap 이 제공하는 form.checkValidity 대신 input 값을 검증하는 함수
  const checkFormValidity = () => {
    const descValid = desc.trim().length > 0;
    setIsDescValiid(descValid);
    const amountValid = amount > 0 || !!amount;
    setIsAmountValid(amountValid);
    const payerValid = payer !== null;
    setIsPayerValid(payerValid);

    setInputPassed(descValid && amountValid && payerValid);

    return descValid && amountValid && payerValid;
  };

  const addExpenseData = useCallback(() => {
    const db = getDatabase();
    const updates = {};
    updates["/groups/" + groupId + "/expenses"] = expense;
    update(ref(db), updates)
      .then((_response) => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [expense, groupId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (checkFormValidity()) {
      const newExpense = {
        date,
        desc,
        amount,
        payer,
      };
      setExpense((prevState) => [...prevState, newExpense]);
    }

    setValidated(true);
    // initialize
    setDesc("");
    setAmount(0);
    setPayer(null);
    e.target.reset();
  };

  useEffect(() => {
    addExpenseData();
    setTimeout(() => {
      // 최초 렌더링 컨디션으로 만들어 준다.
      setValidated(false);
      setInputPassed(false);
      amount <= 0 && setIsAmountValid(false);
      desc === "" && setIsDescValiid(false);
      payer === null && setIsPayerValid(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputPassed, validated]);

  return (
    <StyledWraper>
      <Form noValidate onSubmit={handleSubmit}>
        <StyledTitle>1. 비용추가하기</StyledTitle>
        <Row>
          <Col xs={12}>
            <StyledFormGroup>
              <Form.Control
                type="date"
                placeholder="결제한 날짜를 선택해 주세요"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <StyledFormGroup>
              <Form.Control
                type="text"
                placeholder="비용에 대한 설명을 입력해 주세요"
                isValid={isDescValid}
                isInvalid={!isDescValid && validated}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <Form.Control.Feedback type="invalid" data-valid={isDescValid}>
                비용 내용을 입력해 주세요.
              </Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Control
                type="number"
                placeholder="비용은 얼마였나요?"
                isValid={isAmountValid}
                isInvalid={validated && !isAmountValid}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Form.Control.Feedback type="invalid" data-valid={isAmountValid}>
                1원 이상의 금액을 입력해 주세요.
              </Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
          <Col xs={12} lg={6}>
            <StyledFormGroup>
              <Form.Select
                className="form-control"
                placeholder="누가 결제했나요?"
                defaultValue=""
                isValid={isPayerValid}
                isInvalid={!isPayerValid && validated}
                onChange={(e) => setPayer(e.target.value)}
              >
                <option disabled value="">
                  누가 결제했나요?
                </option>

                {groupMembers.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid" data-valid={isPayerValid}>
                결제자를 선택해 주세요.
              </Form.Control.Feedback>
            </StyledFormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ExpenseSubmitButton type="submit">추가하기</ExpenseSubmitButton>
          </Col>
        </Row>
      </Form>
    </StyledWraper>
  );
};

export default AddExpenseForm;

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 15px;
`;

export const StyledTitle = styled.h3`
  color: white;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  letter-spacing: 0.25px;
  margin-bottom: 15px;
`;

const StyledWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  gap: 18px;

  background: #683ba2;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;

  input,
  select {
    background: #59359a;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: none;
    color: white;
    height: 45px;

    &:focus {
      background: #59359a;
      color: white;
      border: none;
      filter: brightness(80%);
    }

    ::placeholder {
      color: white;
    }
  }
`;

const ExpenseSubmitButton = styled(StyledSubmitButton)`
  width: 100%;
  background-color: #e2d9f3;
  color: #59359a;
  font-weight: 700;
  padding: 16px 32px;
  margin-top: 10px;

  &:hover {
    color: white;
  }
`;
