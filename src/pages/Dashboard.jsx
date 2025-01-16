import React, { useState, useEffect, useContext } from 'react';
import DisplayCampaigns from '../components/DisplayCampaings';
import { Web3Context } from '../context/Web3Context';
import Loader from '../components/Loader';


const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState()
  const [campaigns, setCampaigns] = useState([]);

  const { contractInstance, selectedAccount } = useContext(Web3Context);

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      setMessage("Fetch Campaigns from Blockchain");
      console.log("Fetching campaigns...");
      const data = await contractInstance.getAllCampigns();
      console.log("Fetched data:", data);
  
      const campaignsList = data.map((campaign) => ({
        Id: campaign._Id,
        title: campaign.title,
        description: campaign.description,
        target: campaign.target.toString(),
        deadline: Number(campaign.deadline),
        image: campaign.image || 'https://via.placeholder.com/150', // Fallback image
        owner: campaign.owner || 'Unknown',
        amountCollected: campaign.amountCollected || '0', // Optional field
      }));
  
      console.log("Mapped campaigns:", campaignsList);
      setCampaigns(campaignsList);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (campaigns) fetchCampaigns();
  }, [selectedAccount]);


  return (
    <>

    {isLoading && <Loader message={message} />}
   
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />

</>
  );
};

export default Home;
