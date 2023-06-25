import React from "react";
import { Routes, Route } from "react-router-dom";
import Error from "../../utils/Error";
import LayoutAdmin from "./LayoutAdmin";
import AdminDashboard from "../admin/adminDashboard/AdminDashboard";
import AdminCaptcha from "../admin/adminCaptcha/AdminCaptcha";

export default function AdminRouter() {
  return (
    <Routes>
      <Route element={<LayoutAdmin />}>
        <Route index element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/admin-captcha" element={<AdminCaptcha />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
