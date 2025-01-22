import React, { useContext } from 'react';
import  metamask  from '../assets/metamask.svg';
import { useLocation } from 'react-router-dom';
import { daysLeft } from '../utils/index';
import CustomButton from './CustomButton';
import { Web3Context } from '../context/Web3Context';
import { SiSubtitleedit } from "react-icons/si";

const FundCard = ({ 
  Id,
  owner, 
  title, 
  description, 
  target, 
  deadline, 
  amountCollected, 
  image, 
  handleClick, 
  handleWithdraw 
}) => {
  const { selectedAccount } = useContext(Web3Context);
  const remainingDays = daysLeft(deadline);
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';
  console.log(Id)
  console.log("remaining days : ",remainingDays)
  console.log("in seconds : ",deadline)

  return (
    <div 
      className="sm:w-[285px] w-full rounded-[15px] bg-gray-900 cursor-pointer" 
      onClick={!isProfilePage ? handleClick : undefined} // Disable click if on profile
    >
      <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]" />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
        <SiSubtitleedit  className="w-[17px] h-[17px] object-contain text-[#1dc071]" />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#1dc071]">{title}</p>
        </div>

        <div className="block">
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] leading-[17px] text-[12px] truncate">{description}</p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd]">{amountCollected}</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] text-[#808191] truncate">
              Raised of {target} ETH
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd]">{remainingDays}</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] text-[#808191]">Days Left</p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full  flex justify-center items-center">
            <img src={metamask} alt="user" className="w-[15px] h-[15px] object-contain" />
          </div>
          <p className="font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>
          </p>
        </div>

        {/* Withdraw Button - Visible Only on Profile Page */}
        {isProfilePage && (
          <CustomButton 
          className="mt-[10px]"
            btnType="button"
            title={remainingDays ? `Withdraw after ${remainingDays} ` : "Withdraw"}
            styles="bg-[#1dc071] w-full"
            handleClick={() => {
              if (selectedAccount.toLowerCase() === owner.toLowerCase()) {
                handleWithdraw(Id);
              } else {
                alert("You are not the owner of this campaign.");
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FundCard;
