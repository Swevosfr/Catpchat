import React from "react";
import { Routes, Route } from "react-router-dom";
import Error from "../../utils/Error";
import LayoutUser from "./LayoutUser";
import AddCaptcha from "./addCaptcha/AddCaptcha";
import Dashboard from "./dashboard/Dashboard";
import UserCaptcha from "./UserCaptcha/UserCaptcha";
import ProfilUtilisateur from "./ProfilUtilisateur/ProfilUtilisateur";

export default function UserRouter() {
  return (
    <Routes>
      <Route element={<LayoutUser />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-captcha" element={<AddCaptcha />} />
        <Route path="/user-captcha" element={<UserCaptcha />} />
        <Route path="/mon-profil" element={<ProfilUtilisateur />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
