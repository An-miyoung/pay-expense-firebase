import React, { useCallback, useState } from "react";
import "../firebase";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { groupNameState } from "../states/groupName";
import CenteredOverlayForm from "./shared/CenteredOverlayForm";
import { ROUTES } from "../routes";
import { uid } from "uid";

const CreateGroup = () => {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  // jest테스트를 위해 그룹네임이 올바르게 입력됐느지를 boolean 으로 표사
  const [validGroupName, setValidGroupName] = useState(false);
  const [groupName, setGroupName] = useRecoilState(groupNameState);

  const createGroupNameData = useCallback(async () => {
    const groupId = uid();
    console.log("groupId => ", groupId);

    console.log("groupName => ", groupName);
    await set(ref(getDatabase(), "groups/" + groupId), {
      groupId,
      groupName,
    });
  }, [groupName]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity()) {
      setValidGroupName(true);
      createGroupNameData();
      navigate(ROUTES.ADD_MEMBERS);
    } else {
      e.stopPropagation();
      setValidGroupName(false);
    }
    setValidated(true);
  };

  return (
    <>
      <CenteredOverlayForm
        title="먼저, 더치페이 할 그룹의 이름을 정해볼까요?"
        validated={validated}
        handleSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="추억 이름을 만들어주세요."
            required
            onChange={(e) => setGroupName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid" data-valid={validGroupName}>
            그룹이름을 입력해 주세요.
          </Form.Control.Feedback>
        </Form.Group>
      </CenteredOverlayForm>
    </>
  );
};

export default CreateGroup;
