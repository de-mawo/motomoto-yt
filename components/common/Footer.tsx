import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="">
      <footer className="my-12 bg-slate-50 p-4 dark:bg-black">
        <div className="container mx-auto flex flex-wrap items-center justify-center space-y-4 sm:justify-between sm:space-y-0">
          <div className="flex flex-row space-x-4 pr-3 sm:space-x-8">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />

            <ul className="flex flex-wrap items-center space-x-4 text-sm sm:space-x-8">
              <li>
                <a rel="noopener noreferrer" href="#">
                  Terms of Use
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
          <ul className="flex flex-wrap space-x-4 pl-3 text-sm sm:space-x-8">
            <li>
              <Link rel="noopener noreferrer" href="#">
                Instructor Signup
              </Link>
            </li>
            <li>
              <Link rel="noopener noreferrer" href="#">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
