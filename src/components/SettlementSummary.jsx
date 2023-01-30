import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { groupMembersState } from "../states/groupMembers";
import { expensesState } from "../states/expenses";
import { currencyState } from "../states/currency";
import { StyledTitle } from "./AddExpenseForm";
import { getDescriptiveAmount } from "../utils/getDescriptiveAmount";

export const CalculateMinimumTransaction = (
  expenses,
  members,
  amountPerPerson
) => {
  const minTransactions = [];

  if (amountPerPerson === 0) return minTransactions;

  // 1. 한사람당 얼마를 내야 하는지 - object 형태
  const membersToPay = {};
  members.forEach((member) => {
    membersToPay[member] = amountPerPerson;
  });

  // 2. 사람별로 냈어야 할 금액 - expense 를 읽어가며 membersToPay 에 덮어쓴다.
  expenses.forEach(({ payer, amount }) => {
    membersToPay[payer] -= amount;
  });

  // 3. amount 별로 sorting 된 array
  const sortedMemberToPay = Object.keys(membersToPay)
    .map((member) => ({ member: member, amount: membersToPay[member] }))
    .sort((a, b) => a.amount - b.amount);

  // 4. 포인터를 변경해가며 계산
  var left = 0;
  var right = sortedMemberToPay.length - 1;

  while (left < right) {
    // 1인당 내야 할 돈만큼 경비로 써서 주고 받을 것이 없는 경우를 걸러낸다.
    while (left < right && sortedMemberToPay[left].amount === 0) {
      left++;
    }
    while (right > left && sortedMemberToPay[right].amount === 0) {
      right--;
    }
    // 홀수개의 자료가 들어올 경우, index 가 같아지면서 0 transaction 이 기록되는 걸 피하기 위해
    if (left === right) return minTransactions;

    const toReceive = sortedMemberToPay[left];
    const toSend = sortedMemberToPay[right];
    const amountToReceive = Math.abs(toReceive.amount);
    const amountToSend = Math.abs(toSend.amount);

    if (amountToReceive < amountToSend) {
      // 낼 돈이 더 큰 경우
      minTransactions.push({
        reciever: toReceive.member,
        sender: toSend.member,
        amount: amountToReceive,
      });
      toReceive.amount = 0;
      toSend.amount -= amountToReceive;

      left++;
    } else {
      // 받을 돈이 더 큰 경우
      minTransactions.push({
        reciever: toReceive.member,
        sender: toSend.member,
        amount: amountToSend,
      });
      toReceive.amount += amountToSend;
      toSend.amount = 0;

      right--;
    }
  }

  return minTransactions;
};

const SettlementSummary = () => {
  const members = useRecoilValue(groupMembersState);
  const expenses = useRecoilValue(expensesState);
  const currency = useRecoilValue(currencyState);

  const groupMembersCount = parseInt(members.length);
  const totalAmountExpense = parseInt(
    expenses.reduce(
      (prevAmount, currnetExpense) =>
        prevAmount + parseInt(currnetExpense.amount),
      0
    )
  );
  const splitAmount = totalAmountExpense / groupMembersCount;

  const minTransaction = CalculateMinimumTransaction(
    expenses,
    members,
    splitAmount
  );

  return (
    <StyledWraper>
      <StyledTitle>2.정산은 이렇게</StyledTitle>

      {totalAmountExpense > 0 && members.length > 0 ? (
        <>
          <StyledSummary>
            <span>
              {groupMembersCount}명 - 총{" "}
              {getDescriptiveAmount(
                currency,
                totalAmountExpense.toLocaleString()
              )}{" "}
              지출
            </span>
            <br />
            <span>
              한 사람당{" "}
              {currency.label === "$" || currency.label === "€"
                ? getDescriptiveAmount(currency, splitAmount.toLocaleString())
                : currency.label === "¥" || currency.label === "CN¥"
                ? getDescriptiveAmount(
                    currency,
                    Math.round(splitAmount).toLocaleString()
                  )
                : getDescriptiveAmount(
                    currency,
                    (Math.round(splitAmount / 10) * 10).toLocaleString()
                  )}{" "}
            </span>
          </StyledSummary>
          <StyledUl>
            {minTransaction.map(({ reciever, sender, amount }, idx) => (
              <li key={`transaction-${idx}`}>
                {`To: ${reciever}`}
                <br />
                {`From: ${sender}`}
                <br />
                {currency.label === "$" || currency.label === "€"
                  ? `${getDescriptiveAmount(
                      currency,
                      amount.toLocaleString()
                    )}  보내기`
                  : currency.label === "¥" || currency.label === "CN¥"
                  ? getDescriptiveAmount(
                      currency,
                      Math.round(splitAmount).toLocaleString()
                    )
                  : `${getDescriptiveAmount(
                      currency,
                      (Math.round(amount / 10) * 10).toLocaleString()
                    )}  보내기`}
              </li>
            ))}
          </StyledUl>
        </>
      ) : (
        <span>비용내역을 입력해 주세요</span>
      )}
    </StyledWraper>
  );
};

export default SettlementSummary;

const StyledWraper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  position: relative;

  background: #683ba1;
  box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;

  color: #fffbfb;
  font-size: 20px;

  @media screen and (max-width: 800px) {
    font-size: 15px;
  }
`;

const StyledUl = styled.ul`
  margin-top: 30px;
  font-weight: 400;

  line-height: 200%;
  letter-spacing: 0.1px;

  list-style-type: disclosure-closed;
  li::marker {
    animation: blinker 1.5s linear infinite;
  }
  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;

const StyledSummary = styled.div`
  margin-top: 15px;
  text-align: center;
`;
