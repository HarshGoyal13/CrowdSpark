import React from "react";
import { FaReact, FaEthereum, FaCode, FaCss3Alt, FaFileCode, FaDatabase, FaNodeJs, FaServer } from 'react-icons/fa';
import { SiSolidity, SiIpfs } from 'react-icons/si';
import AboutStats from "../components/AboutStats"

const TechStackSection = () => {
  return (
    <>
      {/* Tech Stack Section */}
      <section className="text-white text-center py-16 bg-gradient-to-b from-black to-gray-900">
  <h2 className="text-4xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">
    Tech Stack
  </h2>
  <div className="flex flex-wrap justify-center gap-5 px-6">
    {/* Frontend Card */}
    <div className="p-8 rounded-xl shadow-lg border border-yellow-400 hover:text-black transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 w-[250px]">
      <h3 className="text-2xl font-bold mb-4 text-yellow-400">
        <FaReact className="inline-block mr-2 text-yellow-400 text-3xl" /> Frontend
      </h3>
      <ul className="text-gray-300 text-lg space-y-2 mt-[25px]">
        <li className="flex items-center">
          <FaCode className="mr-2 text-yellow-400" />
          React.js (JavaScript)
        </li>
        <li className="flex items-center">
          <FaCss3Alt className="mr-2 text-yellow-400" />
          Tailwind CSS
        </li>
      </ul>
    </div>

    {/* Smart Contracts Card */}
    <div className="p-8 rounded-xl shadow-lg border border-yellow-400 hover:text-black transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 w-[250px]">
      <h3 className="text-2xl font-bold mb-4 text-yellow-400">
        <FaEthereum className="inline-block mr-2 text-yellow-400 text-3xl" /> Smart Contracts
      </h3>
      <ul className="text-gray-300 text-lg space-y-2 mt-[25px]">
        <li className="flex items-center">
          <SiSolidity className="mr-2 text-yellow-400 text-2xl" />
          Solidity
        </li>
        <li className="flex items-center">
          <FaFileCode className="mr-2 text-yellow-400" />
          Foundry
        </li>
        <li className="flex items-center">
          Deployed on Ethereum blockchain
        </li>
      </ul>
    </div>

    {/* Storing Data Card */}
    <div className="p-8 rounded-xl shadow-lg border border-yellow-400 hover:text-black transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 w-[250px]">
      <h3 className="text-2xl font-bold mb-4 text-yellow-400">
        <SiIpfs className="inline-block mr-2 text-yellow-400 text-3xl" /> Storing Data
      </h3>
      <ul className="text-gray-300 text-lg space-y-2 mt-[25px]">
        <li className="flex items-center">
          <SiIpfs className="mr-2 text-yellow-400 text-2xl" />
          IPFS
        </li>
        <li className="flex items-center">

          (InterPlanetary File System)
        </li>
      </ul>
    </div>

    {/* Backend Card */}
    <div className="p-8 rounded-xl shadow-lg border border-yellow-400 hover:text-black transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 w-[250px]">
      <h3 className="text-2xl font-bold mb-4 text-yellow-400">
        <SiIpfs className="inline-block mr-2 text-yellow-400 text-3xl" /> Backend
      </h3>
      <ul className="text-gray-300 text-lg space-y-2 mt-[25px]">
        <li className="flex items-center">
          <FaDatabase className="mr-2 text-yellow-400" />
          MongoDB
        </li>
        <li className="flex items-center">
          <FaNodeJs className="mr-2 text-yellow-400" />
          Node.js
        </li>
        <li className="flex items-center">
          <FaServer className="mr-2 text-yellow-400" />
          Express.js
        </li>
      </ul>
    </div>
  </div>
</section>



      {/* Application Functionality Section */}
      <section className="bg-gradient-to-b from-gray-800 to-black text-white py-16  px-8">

      <div className="text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white">
  We are passionate about revolutionizing the way we <span className="text-green-500">donate</span>. Our
  innovative platform <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
    combines blockchain technology
  </span>, <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
    transparency
  </span>, and <span className="text-green-500">security</span> to create an
  <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
    unparalleled donation experience.
  </span>
</div>

    <AboutStats/>
  
     
      </section>
    </>
  );
};

export default TechStackSection;
