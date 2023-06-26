import React from "react";
import { Routes, Route } from "react-router-dom";
import Error from "../../utils/Error";
import LayoutAdmin from "./LayoutAdmin";
import AdminDashboard from "../admin/adminDashboard/AdminDashboard";
import AdminCaptcha from "../admin/adminCaptcha/AdminCaptcha";
import AdminArtistes from "./adminArtistes/AdminArtistes";

export default function AdminRouter() {
  return (
    <Routes>
      <Route element={<LayoutAdmin />}>
        <Route index element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-captcha" element={<AdminCaptcha />} />
        <Route path="/admin-artistes" element={<AdminArtistes />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
