import React from 'react';
import { useNavigate } from 'react-router-dom';
import FundCard from './FundCard';
import { loader } from '../assets';

const DisplayCampaigns = ({ title, handelWithdraw, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    console.log("Navigating to details page with campaign:", campaign);
    navigate(`/campaign-details/${campaign.Id}`, { state: campaign });
  };

  return (
    <div >
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-center justify-center h-[250px]  text-[14px] text-[#818183]">
            Please Connect To Wallet..
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign, index) => (
            <FundCard 
              key={campaign.id || index} // Use `campaign.id` if unique, else fallback to index
              {...campaign} 
              handleClick={() => handleNavigate(campaign)} 
              handleWithdraw={() => handelWithdraw(campaign.Id)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
