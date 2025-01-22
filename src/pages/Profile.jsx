import React, { useState, useEffect, useContext } from 'react';
import DisplayCampaigns from '../components/DisplayCampaings';
import { Web3Context } from "../context/Web3Context";
import toast from 'react-hot-toast';

const Profile = () => {  
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { contractInstance, selectedAccount } = useContext(Web3Context);
  const fetchCampaigns = async () => {
  try {
    setIsLoading(true);
    const data = await contractInstance.getAllCampigns();
    console.log("Fetched data (raw):", data);

    // Extract the actual campaigns array from the Proxy object
    const campaignsArray = Array.from(data).map((campaign, key) => ({
      Id: campaign[0], 
      owner: campaign[1],
      title: campaign[2],
      description: campaign[3],
      target: campaign[4], // Convert BigInt to string
      deadline: campaign[5]?.toString(), // Convert BigInt to string
      amountCollected: campaign[6], // Convert BigInt to string
      image: campaign[7],
    }));

    console.log("Processed campaigns array:", campaignsArray);

    // Filter based on the selectedAccount
    const filterValues = campaignsArray.filter(campaign => campaign.owner.toLowerCase() === selectedAccount.toLowerCase());

    console.log("Filtered campaigns:", filterValues);

    setCampaigns(filterValues);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    toast.error(error);
  } finally {
    setIsLoading(false);
  }
};


const handelWithdraw = async (Id) => {
  try {

    

    const tx = await contractInstance.withDrawOwner(Id);

    await tx.wait(); 


    toast.success("Withdrawal Successful!");

  } catch (error) {
    console.error("Error during withdrawal:", error);
    

    const errorMessage = error?.message || "An error occurred during withdrawal.";
    toast.error(errorMessage);
  }
};



  useEffect(() => {
    if (contractInstance) fetchCampaigns();
  }, [contractInstance]);

  useEffect(() => {
    console.log("Updated campaigns:", campaigns);
  }, [campaigns]);

  return (
    <>
      <h1>Profile</h1>
      <DisplayCampaigns 
        title="Your Campaigns"
        handelWithdraw={handelWithdraw}
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </>
  );
};

export default Profile;
