import React, { useState, useCallback } from "react";
import "../firebase";
import { getDatabase, ref, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { InputTags } from "react-bootstrap-tagsinput";
import { useSetRecoilState } from "recoil";
import { ROUTE_UTILS } from "../routes";
import CenteredOverlayForm from "./shared/CenteredOverlayForm";
import { groupMembersState } from "../states/groupMembers";
import { StyledAddMemberErrorMsg } from "../components/shared/StyleTags";
import { useGroupData } from "../hooks/useGroupData";

const AddMembers = () => {
  const { groupId, groupName, groupMembers } = useGroupData();

  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const setGroupMembers = useSetRecoilState(groupMembersState);
  // 삼성모바일에서 <InputTags> 를 처리하지 못해서 member를 ','로 구분하도록 처리하기 위해
  const [groupMembersSting, setGroupMembersString] = useState("");

  const header = `${groupName} 그룹에 속한 사람들의 이름을 모두 적어 주세요.`;

  const isSamsungInternet =
    window.navigator.userAgent.includes("SAMSUNG") ||
    window.navigator.userAgent.includes("SM");

  const addMembersData = useCallback(() => {
    const db = getDatabase();
    const updates = {};
    updates["/groups/" + groupId + "/groupMembers"] = groupMembers;

    update(ref(db), updates)
      .then((_response) => {})
      .catch((error) => {
        alert("멤버추가에 실패했습니다. 다시 시도해 주십시요.");
        console.log(error);
      });
  }, [groupId, groupMembers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);

    if (groupMembers.length > 0) {
      addMembersData();
      navigate(ROUTE_UTILS.EXPENSE_MAIN(groupId));
    } else if (isSamsungInternet && groupMembersSting.length > 0) {
      setGroupMembers(groupMembersSting.split(","));
      navigate(ROUTE_UTILS.EXPENSE_MAIN(groupId));
    }
  };

  useGroupData();

  return (
    <CenteredOverlayForm
      title={header}
      validated={validated}
      handleSubmit={handleSubmit}
    >
      <div style={{ marginBottom: "0.8em" }} />

      {isSamsungInternet ? (
        <Form.Control
          placeholder="이름간 콤마(,)로 구분입력"
          value={groupMembersSting}
          onChange={({ target }) => setGroupMembersString(target.value)}
          data-testid="input-member-names"
        />
      ) : (
        <InputTags
          placeholder="이름간 띄어쓰기(스페이스바)"
          values={groupMembers}
          onTags={(value) => setGroupMembers(value.values)}
          data-testid="input-member-names"
        />
      )}

      {groupMembers.length === 0 && validated && (
        <StyledAddMemberErrorMsg>
          그룹멤버들의 이름을 입력해 주세요.
        </StyledAddMemberErrorMsg>
      )}
    </CenteredOverlayForm>
  );
};

export default AddMembers;
