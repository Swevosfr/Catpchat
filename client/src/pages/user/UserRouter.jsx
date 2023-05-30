import React from "react";
import { Routes, Route } from "react-router-dom";
import Error from "../../utils/Error";
import LayoutUser from "./LayoutUser";
import AddCaptcha from "./addCaptcha/AddCaptcha";
import Dashboard from "./dashboard/Dashboard";

export default function UserRouter() {
  return (
    <Routes>
      <Route element={<LayoutUser />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-captcha" element={<AddCaptcha />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
