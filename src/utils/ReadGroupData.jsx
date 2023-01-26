import { useEffect } from "react";
import "../firebase";
import { getDatabase, ref, onValue } from "firebase/database";
// import { useRecoilValue } from "recoil";
// import { groupIdState } from "../states/groupId";

const ReadGroupData = () => {
  // const groupId = useRecoilValue(groupIdState);
  const db = getDatabase();

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        console.log(JSON.stringify(data));
      }
    });
  }, [db]);
};

export default ReadGroupData;
