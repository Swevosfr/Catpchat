import jwt_decode from "jwt-decode";

let saveToken = (token) => {
  localStorage.setItem("token", token);
};

const logout = () => {
  localStorage.removeItem("token");
};

let isLogged = () => {
  let token = localStorage.getItem("token");
  return !!token;
};

export const accountService = {
  saveToken,
  logout,
  isLogged,
};
