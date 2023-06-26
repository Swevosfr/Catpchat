import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { accountService } from "../../../services/accountService";
import Captcha from "../../../components/Captchat";

export default function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    user_email: "",
    user_password: "",
  });
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaDone, setCaptchaDone] = useState(false);

  const { user_email, user_password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleCaptchaClick = () => {
    setShowCaptcha(true);
  };

  const handleCaptchaClose = () => {
    setShowCaptcha(false);
    setCaptchaDone(true);
  };

  const handleLoginClick = () => {
    if (captchaDone) {
      const body = { user_email, user_password };

      fetch("http://localhost:8089/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((parseResponse) => {
          console.log(parseResponse);

          if (parseResponse.token) {
            accountService.saveToken(parseResponse.token);
            navigate("/user/dashboard");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-900 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Connectez-vous à votre compte
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="user_email"
                autoComplete="family-name"
                value={user_email}
                onChange={onChange}
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-white">
                Mot de passe
              </label>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  Mot de passe oublié?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="user_password"
                type="password"
                value={user_password}
                onChange={onChange}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              className={`flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                !captchaDone ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleLoginClick}
              disabled={!captchaDone}
            >
              Se connecter
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Pas un membre ?
          <Link
            to="/register"
            className="font-semibold text-indigo-500 hover:text-indigo-300 ml-1"
          >
            Inscrivez vous !
          </Link>
        </p>
        <div className="mt-6">
          <button
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={handleCaptchaClick}
            disabled={showCaptcha}
          >
            Faire le captcha
          </button>
        </div>
      </div>
      <p className="text-center text-gray-500 text-xs pt-10">
        &copy;2023. Tous droits réservés.
      </p>

      {/* Modal Captcha */}
      {showCaptcha && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <Captcha
            setCaptchaDone={setCaptchaDone}
            onClose={handleCaptchaClose}
          />
        </div>
      )}
    </div>
  );
}
