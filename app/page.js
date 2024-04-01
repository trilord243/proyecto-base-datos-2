import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const navigation = [
  { name: "Mas productos ", href: "#" },

  { name: "Soluciones", href: "#" },
  { name: "Quienes somos", href: "#" },
];

export default function Home() {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50 bg-">
        <div className="mx-auto max-w-7xl">
          <div className="px-6 pt-6 lg:max-w-2xl lg:pl-8 lg:pr-0">
            <nav
              className="flex items-center justify-between lg:justify-start"
              aria-label="Global"
            >
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <picture>
                  <img
                    alt="Your Company"
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  />
                </picture>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 lg:hidden"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="hidden lg:ml-12 lg:flex lg:gap-x-14">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <svg
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <div className="hidden sm:mb-10 sm:flex">
                  <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    Aprende mas sobre soluciones sobre base de datos con grafos!{" "}
                    <a
                      href="#"
                      className="whitespace-nowrap font-semibold text-indigo-600"
                    >
                      <span className="absolute inset-0" aria-hidden="true" />
                      Neo4j <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
                <h1 className="text-4xl text-center font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Gestion sencilla de almacenes!
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Con este proceso de almacenamiento, podras tener un control de
                  las rutas de picking y gestionar los pedidods de manera
                  sencilla usando super poderes de los grafos
                </p>
                <div className="mt-10 flex items-center gap-x-10">
                  <Link
                    href="/administrador"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Vision administrador <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/cliente"
                    className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Vision Cliente <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <picture>
            <img
              className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
              src="https://images.pexels.com/photos/4484155/pexels-photo-4484155.jpeg"
              alt=""
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
