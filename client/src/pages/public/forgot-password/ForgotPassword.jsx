import React, { useState } from "react";
import Notification from "../../../components/NotificationForgot";

export default function ForgotPassword() {
  const [input, setInput] = useState({
    user_email: "",
  });

  const { user_email } = input;
  const [showNotification, setShowNotification] = useState(false);

  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { user_email };

      const response = await fetch(
        "http://localhost:8089/reset/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const parseResponse = await response.json();
      console.log(parseResponse);
      if (parseResponse.message) {
        setShowNotification(true);
        //navigate("/SignIn");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {showNotification && <Notification />}
      <div>
        <p className="text-white mt-10 text-center text-4xl font-bold leading-9 tracking-tight ">
          Mot de{" "}
          <span className="text-transparent bg-clip-text mt-10 text-center text-4xl font-bold leading-9 tracking-tight  bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
            passe oublié ?
          </span>
        </p>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmitForm} className="space-y-6">
          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="user_email"
                value={user_email}
                onChange={(e) => onChange(e)}
                autoComplete="family-name"
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Réinitialiser mon mot de passe
            </button>
          </div>
        </form>
      </div>
      <p className="text-center text-gray-500 text-xs pt-10">
        &copy;2023 Noeda. Tous droits réservés.
      </p>
    </div>
  );
}
