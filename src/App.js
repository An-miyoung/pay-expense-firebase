import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./routes.js";
import CreateGroup from "./components/CreateGroup";
import AddMembers from "./components/AddMembers";
import ExpenseMain from "./components/ExpenseMain";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div>
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<Navigate to={ROUTES.CREATE_GROUP} />} />
            <Route path={ROUTES.CREATE_GROUP} element={<CreateGroup />} />
            <Route path={ROUTES.ADD_MEMBERS} element={<AddMembers />} />
            <Route path={ROUTES.EXPENSE_MAIN} element={<ExpenseMain />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
