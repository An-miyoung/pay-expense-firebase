import React, { useCallback, useState } from "react";
import "../firebase";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useRecoilState, useSetRecoilState } from "recoil";
import { groupIdState } from "../states/groupId";
import { groupNameState } from "../states/groupName";
import CenteredOverlayForm from "./shared/CenteredOverlayForm";
import { ROUTE_UTILS } from "../routes";
import { uid } from "uid";

const CreateGroup = () => {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  // jest테스트를 위해 그룹네임이 올바르게 입력됐느지를 boolean 으로 표사
  const [validGroupName, setValidGroupName] = useState(false);
  const setGroupId = useSetRecoilState(groupIdState);
  const [groupName, setGroupName] = useRecoilState(groupNameState);

  const createGroupNameData = useCallback(() => {
    const guid = uid();
    setGroupId(guid);
    set(ref(getDatabase(), "groups/" + guid), {
      groupId: guid,
      groupName,
    })
      .then((_response) => {
        navigate(ROUTE_UTILS.ADD_MEMBERS(guid));
      })
      .catch((error) => {
        alert("그룹을 만드는데 실패했습니다. 다시 시도해 주십시요.");
        console.log(error);
      });
  }, [groupName, navigate, setGroupId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity()) {
      setValidGroupName(true);
      createGroupNameData();
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
