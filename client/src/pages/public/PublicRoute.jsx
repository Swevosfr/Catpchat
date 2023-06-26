import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Layout from "./Layout";
import Login from "../public/login/Login";
import Register from "../public/register/Register";
import TestCaptcha from "../public/testcaptcha/TestCaptcha";
import ResetPassword from "./reset-password/ResetPassword";
import ForgotPassword from "./forgot-password/ForgotPassword";
import Error from "../../utils/Error";

export default function PublicRoute() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test-captcha" element={<TestCaptcha />} />
        <Route
          path="/reset-password/:id_user/:token"
          element={<ResetPassword />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
