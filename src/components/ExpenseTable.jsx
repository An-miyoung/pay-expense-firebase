import React from "react";
import { Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { expensesState } from "../states/expenses";
import { currencyState } from "../states/currency";
import { getDescriptiveAmount } from "../utils/getDescriptiveAmount";
import { OverlayWrapper } from "./shared/OverlayWrapper";

function ExpenseTable() {
  const expenses = useRecoilValue(expensesState);
  const currency = useRecoilValue(currencyState);
  return (
    <OverlayWrapper minHeight={"76vh"} padding={"3vh"}>
      <StyledTable data-testid="expenseList" borderless hover responsive>
        <StyledThead>
          <tr>
            <th>날짜</th>
            <th>내용</th>
            <th>결제자</th>
            <th>금액</th>
          </tr>
        </StyledThead>
        <StyledBody>
          {expenses.map(({ date, desc, payer, amount }, idx) => (
            <tr key={`expense-${idx}`}>
              <td>{date}</td>
              <td>{desc}</td>
              <td>{payer}</td>
              <td>
                {getDescriptiveAmount(
                  currency,
                  parseInt(amount).toLocaleString()
                )}{" "}
              </td>
            </tr>
          ))}
        </StyledBody>
      </StyledTable>
    </OverlayWrapper>
  );
}

export default ExpenseTable;

const StyledTable = styled(Table)`
  min-width: 450px;
  @media screen and (max-width: 600px) {
    min-width: 300px;
  }
`;

const StyledThead = styled.thead`
  color: #6b3da6;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  th {
    padding: 15px 8px;
    min-width: 60px;
  }
  @media screen and (max-width: 600px) {
    font-size: 4vw;
    line-height: 10px;
    th {
      padding: 10px 4px;
    }
  }
`;

const StyledBody = styled.tbody`
  td {
    font-weight: 400;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    @media screen and (max-width: 600px) {
      font-size: 4vw;
      line-height: 20px;
    }
  }
`;
