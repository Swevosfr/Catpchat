import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../../images/logoCaptcha-removebg.png";

export default function SignUp() {
  const [inputs, setInputs] = useState({
    user_first_name: "",
    user_last_name: "",
    user_email: "",
    user_password: "",
  });

  const navigate = useNavigate();

  const { user_first_name, user_last_name, user_email, user_password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    // Check if all input fields are filled out
    const isFilled = Object.values(inputs).every((input) => input !== "");
    if (!isFilled) {
      alert("Veuillez remplir tous les champs!");
      return;
    }

    try {
      const body = {
        user_first_name,
        user_last_name,
        user_email,
        user_password,
      };
      const response = await fetch("http://localhost:8089/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseResponse = await response.json();
      localStorage.setItem("token", parseResponse.token);

      // Redirect to dashboard page upon successful signup
      navigate("/user/dashboard");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-20 w-auto" src={Logo} alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Inscrivez-vous !
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmitForm} className="space-y-6">
          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Prénom
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="user_first_name"
                autoComplete="family-name"
                value={user_first_name}
                onChange={(e) => onChange(e)}
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Nom
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="user_last_name"
                autoComplete="family-name"
                value={user_last_name}
                onChange={(e) => onChange(e)}
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
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
                onChange={(e) => onChange(e)}
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Mot de passe
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="user_password"
                autoComplete="family-name"
                value={user_password}
                onChange={(e) => onChange(e)}
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              S'inscrire
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Déjà membre ?
          <Link
            to="/Login"
            className="font-semibold text-indigo-500 hover:text-indigo-300 ml-1"
          >
            Connectez vous !
          </Link>
        </p>
      </div>
      <p className="text-center text-gray-500 text-xs pt-5">
        &copy;2023. Tous droits réservés.
      </p>
    </div>
  );
}
