import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PublicRoute from "./pages/public/PublicRoute";
import UserRouter from "./pages/user/UserRouter";
import AuthGuard from "./helpers/AuthGuard";
import AdminRouter from "./pages/admin/AdminRouter";

function App() {
  return (
    <div className="h-full bg-gray-900">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<PublicRoute />} />
          <Route
            path="/user/*"
            element={
              <AuthGuard>
                <UserRouter />
              </AuthGuard>
            }
          />
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
