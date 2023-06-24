import { CloudArrowUpIcon, ServerIcon } from "@heroicons/react/20/solid";

export default function Dashboard() {
  return (
    <div className=" min-h-screen w-full bg-white">
      <div className="relative isolate overflow-hidden  px-6 py-24 sm:py-32 lg:overflow-visible py-10 lg:pl-72 h-full w-full">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            />
          </svg>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-indigo-600">
                  Déployez vos captchas
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Un meilleur déploiement !
                </h1>
                <p className="mt-6 text-xl leading-8 text-gray-700">
                  Bienvenue sur Captcha, une plateforme permettant aux Artistes
                  de créer leurs propres catpchas pour qu'ils soient déployés
                  lors de la connexion sur la plateforme.
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <img
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
              alt=""
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                <p>
                  La plateforme est encore un prototype et est un projet de fin
                  d'année. La totalité des fonctionnalités ne sont pas encore
                  disponibles et sont toujours en cours de développement.
                </p>
                <ul className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <CloudArrowUpIcon
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Appuyez pour déployer vos captchats.
                      </strong>{" "}
                      Dans la navigation, "Ajouter un captcha" vous permettra
                      d'ajouter vos premiers catpchas qui seront tout de suite
                      mis en ligne sur la plateforme !
                    </span>
                  </li>

                  <li className="flex gap-x-3">
                    <ServerIcon
                      className="mt-1 h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Base de données.
                      </strong>{" "}
                      L'ensemble de vos images utilisées pour les captchas sont
                      enregistrés en base de données et sont sécurisées.
                    </span>
                  </li>
                </ul>

                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                  Un bug ? Un problème ?
                </h2>
                <p className="mt-6">
                  Si un bug apparaît lors de l'utilisation de l'application,
                  n'hésitez pas à me contacter directement sur mon adresse mail
                  : naierabassi@yahoo.fr. Je serais ravis de vous aider et aussi
                  de rendre l'application la plus fiable et simple d'utilisation
                  possible
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//py-10 lg:pl-72
