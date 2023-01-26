import { useEffect } from "react";
import "../firebase";
import { getDatabase, ref, onValue } from "firebase/database";

const ReadGroupData = () => {
  //  DB 안의 모든 데이터를 읽어온다.
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
