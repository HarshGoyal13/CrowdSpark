import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Web3Context } from "../context/Web3Context";
import CustomButton from "./CustomButton"; // Ensure this import is correct
import { logo, menu } from '../assets';
import ethlogo from '../assets/ethlogo.png';
import { navlinks } from '../constant/navlinks';

const Navbar = () => {
  const { handelwallet, contractInstance, selectedAccount, chainId } = useContext(Web3Context);
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);

  console.log("Contract Instance:", contractInstance);
  console.log("Selected Account:", selectedAccount);
  console.log("Chain ID:", chainId);

  return (
    <div className="flex justify-center mx-auto bg-[#1c1c24] items-center mb-[35px] gap-6 px-4 py-4 rounded-xl sticky top-0 z-10">
      {/* Desktop Navbar */}
      <div className="hidden lg:flex flex-row items-center justify-between gap-8 w-[1190px] ">
        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-6">
          <img src={logo} alt="Logo" className="w-[40px] h-[40px] object-contain" />
        </Link>

        {/* Links for Desktop View */}
        <div className="flex items-center gap-6">
          {navlinks.map((link) => (
            <Link
              key={link.name}
              to={link.link}
              className={`flex items-center gap-[30px] text-white hover:text-yellow-400 ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}
              onClick={() => setIsActive(link.name)}
            >

              <p className="font-semibold text-[14px]">{link.name}</p>
            </Link>
          ))}
        </div>

        {/* Buttons and Profile Icon */}
        <div className="flex items-center gap-6">
          <CustomButton 
            btnType="button"
            title={selectedAccount ? 'Create a campaign' : 'Connect'}
            styles={selectedAccount ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
            handleClick={() => {
              if (selectedAccount) {
                navigate('create-campaign');
              } else {
                handelwallet(); // Ensure the function is invoked properly here
              }
            }}
          />
          <Link to="/profile">
            <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
              <img src={ethlogo} alt="user" className="w-[60%] h-[60%] object-contain" />
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden  flex justify-between items-center relative w-[400px] p-4 rounded-xl bg-[#1c1c24]">
        {/* Logo */}
        <Link to={"/"} className="w-[50px] h-[50px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img src={logo} alt="Logo" className=" object-contain" />
        </Link>

        {/* Menu Icon for Mobile */}
        <img 
          src={menu}
          alt="menu"
          className="w-[50px] h-[50px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)} 
        />

        {/* Mobile Drawer (Links Toggle Visibility) */}
        <div className={`absolute mt-[110px]  top-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-5 w-[400px]   h-full ${!toggleDrawer ? '-translate-x-[1200px]' : 'translate-x-0'} transition-all duration-700`}>
          <ul className="bg-[#1c1c24] p-6">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-8 mb-6 ${isActive === link.name ? 'bg-[#3a3a43]' : ''}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img 
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[40px] h-[40px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                />
                <p className={`ml-[20px] font-epilogue font-semibold text-[20px] ${isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'}`}>
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          {/* Mobile Button for Create Campaign / Connect */}
          <div className="flex justify-center py-4">
            <CustomButton 
              className="text-[50px] w-full max-w-[260px] py-6"  // Adjusted width to be responsive with a max width
              btnType="button"
              title={selectedAccount ? 'Create a campaign' : 'Connect'}
              styles={selectedAccount ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if (selectedAccount) {
                  navigate('create-campaign');
                } else {
                  handelwallet(); // Ensure the function is invoked properly here
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
