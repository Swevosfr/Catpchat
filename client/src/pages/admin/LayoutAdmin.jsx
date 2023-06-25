import React from "react";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "../../components/NavbarAdmin";

export default function LayoutUser() {
  return (
    <div>
      <NavbarAdmin />
      <Outlet />
    </div>
  );
}
