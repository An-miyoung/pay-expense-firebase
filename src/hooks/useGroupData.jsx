import { useEffect, useCallback } from "react";
import "../firebase";
import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { useRecoilState } from "recoil";
import { groupIdState } from "../states/groupId";
import { groupNameState } from "../states/groupName";
import { groupMembersState } from "../states/groupMembers";
import { expensesState } from "../states/expenses";

export const useGroupData = () => {
  const { guid } = useParams();
  const db = getDatabase();
  const [groupId, setGroupId] = useRecoilState(groupIdState);
  const [groupName, setGroupName] = useRecoilState(groupNameState);
  const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
  const [expenses, setExpenses] = useRecoilState(expensesState);

  const fetchAndSave = useCallback(() => {
    onValue(ref(db, "/groups/" + guid), (snapshot) => {
      if (guid?.length > 0) {
        const data = snapshot.val();
        if (data !== null) {
          const { groupId, groupName, groupMembers, expenses } = data;
          setGroupId(groupId);
          setGroupName(groupName);
          setGroupMembers(groupMembers || []);
          setExpenses(expenses || []);
        } else if (data === null || data === undefined) {
          alert("데이터를 불러오는데 실패했습니다. 다시 시도해주세요.");
        }
      }
    });
  }, [db, guid, setExpenses, setGroupId, setGroupMembers, setGroupName]);

  useEffect(() => {
    fetchAndSave();
  }, [fetchAndSave]);

  return {
    groupId,
    groupName,
    groupMembers,
    expenses,
  };
};
