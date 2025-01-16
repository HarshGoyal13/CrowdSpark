import React, {useContext, useEffect, useState} from 'react'
import {Web3Context} from "../context/Web3Context"

const CampaignStatus = ({id}) => {
    const [status, setStatus] = useState(true);
     const {  contractInstance } = useContext(Web3Context);

        useEffect(()=>{
            const checkStatus = async()=>{
                try{
                   const result =  await contractInstance.getCampaignStatus(id);
                   setStatus(result);
                }catch(error){
                    console.log(error);
                }
            }
            checkStatus();
        },[contractInstance])

  return (
    <div>
 
<div className="top-0 left-0 w-full bg-gradient-to-r from-green-500 to-teal-800 text-white text-lg font-medium py-4 px-6 shadow-lg z-50 flex justify-between items-center">
  <span className="text-2xl font-bold">Campaign Status </span> 
  <span className="text-2xl font-bold animate-pulse">{status} </span>
</div>
    </div>
  )
}

export default CampaignStatus