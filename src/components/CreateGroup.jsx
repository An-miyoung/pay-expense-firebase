import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useSetRecoilState } from "recoil";
import { groupNameState } from "../states/groupName";

import CenteredOverlayForm from "./shared/CenteredOverlayForm";
import { ROUTES } from "../routes";

const CreateGroup = () => {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  // jest테스트를 위해 그룹네임이 올바르게 입력됐느지를 boolean 으로 표사
  const [validGroupName, setValidGroupName] = useState(false);
  const setGroupName = useSetRecoilState(groupNameState);

  // const saveGroupName = () => {
  //   API.post("groupsApi", "/groups", {
  //     body: {
  //       groupName,
  //     },
  //   })
  //     .then(({ data }) => {
  //       const { guid } = data;
  //       setGroupId(guid);
  //       navigate(ROUTE_UTILS.ADD_MEMBERS(guid));
  //     })
  //     .catch(({ response }) => {
  //       alert(response.data.error);
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity()) {
      setValidGroupName(true);
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
