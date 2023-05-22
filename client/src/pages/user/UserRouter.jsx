import React from "react";
import { Routes, Route } from "react-router-dom";
import Error from "../../utils/Error";
import LayoutUser from "./LayoutUser";
import Dashboard from "./Dashboard";
import Captcha from "./Captcha";

export default function UserRouter() {
  return (
    <Routes>
      <Route element={<LayoutUser />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/captcha" element={<Captcha />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
