import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    candidat_email: "",
    candidat_password: "",
  });

  const { candidat_email, candidat_password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { candidat_email, candidat_password };

      const response = await fetch("http://localhost:8080/auth/logincandidat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseResponse = await response.json();
      console.log(parseResponse);

      // Redirect to dashboard page upon successful login
      if (parseResponse.token) {
        localStorage.setItem("token", parseResponse.token);
        navigate("/candidat/HomepageCandidat");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-900 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Connectez-vous à votre compte
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmitForm} className="space-y-6">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="candidat_email"
                autoComplete="family-name"
                value={candidat_email}
                onChange={(e) => onChange(e)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Mot de passe
              </label>
              <div className="text-sm">
                <Link
                  to="/forgot-candidat-password"
                  className="font-semibold text-blue-500 hover:text-blue-800"
                >
                  Mot de passe oublié?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="candidat_password"
                type="password"
                value={candidat_password}
                onChange={(e) => onChange(e)}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="text-sm pt-2">
              <Link
                to="/SignInRecruteur"
                className="font-semibold text-blue-500 hover:text-blue-800"
              >
                Recruteur ? Connectez-vous !
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Se connecter
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Pas un membre ?
          <Link
            to="/SignUp"
            className="font-semibold text-blue-500 hover:text-blue-800 ml-1"
          >
            Inscrivez vous !
          </Link>
        </p>
      </div>
      <p className="text-center text-gray-500 text-xs pt-10">
        &copy;2023 Noeda. Tous droits réservés.
      </p>
    </div>
  );
}
