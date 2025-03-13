import { Logo } from "../icons/Logo";

export const Footer = () => {
  return (
    <footer className=" bg-black border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:border-gray-600">
      <div className="w-full max-w-screen-xl mx-auto md:py-7">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="#"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Logo />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              EthicCheck
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/about" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="/services" className="hover:underline me-4 md:me-6">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                AIs
              </a>
            </li>

          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="#" className="hover:underline">
            EthicCheck™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};
