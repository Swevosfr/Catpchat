import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PublicRoute from "./pages/public/PublicRoute";
import UserRouter from "./pages/user/UserRouter";
import AuthGuard from "./helpers/AuthGuard";

function App() {
  return (
    <div className="text-3xl font-bold underline">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<PublicRoute />} />
          <Route path="/user/*" element={<UserRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
