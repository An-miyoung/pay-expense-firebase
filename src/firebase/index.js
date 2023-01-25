// firebase 설치 doc 에는 src/index.js 에 복사하지만
// react가 만들어 준 src/index.js 에는 많은 내용이 있으므로
// firebase 폴더를 만들고 indes.js 에 복사한 후
// 사용하고자 하는 컴포넌트에서 import "../firebase" 로 불러서 사용한다.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Realtime Database 를 웹사이트에서 만든 후
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrCNMxZvI_tyfo95v49Xh8BeloBEdwzls",
  authDomain: "pay-expense-fc921.firebaseapp.com",
  projectId: "pay-expense-fc921",
  storageBucket: "pay-expense-fc921.appspot.com",
  messagingSenderId: "641708598895",
  appId: "1:641708598895:web:c9c1ff91f6986cff0dcf9a",
  measurementId: "G-5KF11NF50Z",
  databaseURL:
    "https://pay-expense-fc921-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics =
getAnalytics(app);

getDatabase();
