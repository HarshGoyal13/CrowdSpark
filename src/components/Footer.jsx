import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t-2 border-primary-hover py-4 w-full bg-gray-800 mt-[30px] sticky  bottom-0">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-white">&copy; {new Date().getFullYear()} CrowdFundIt.</p>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/HarshGoyal13"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-400"
          >
            <FaGithub className="text-2xl" />
          </a>
          <Link to="/aboutUs" className="text-white hover:text-yellow-400">
            About Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
