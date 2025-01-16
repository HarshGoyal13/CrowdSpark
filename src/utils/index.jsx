

import {ethers} from "ethers"

export const daysLeft = (deadline) => {
  const difference = deadline * 1000 - Date.now();
  const remainingDays = Math.max(difference / (1000 * 3600 * 24), 0); // Ensure non-negative value

  return Math.floor(remainingDays); // Return integer value
};
  
export const calculateBarPercentage = (goal, raisedAmount) => {

  const goalBigInt = BigInt(goal) * 10n**18n;  
  const raisedAmountBigInt = BigInt(raisedAmount);

  // Ensure no division by zero
  if (goalBigInt === 0n) {
    console.error("Goal cannot be zero");
    return 0;
  }
  // Calculate the percentage
  const percentageBigInt = (raisedAmountBigInt * 100n) / goalBigInt;

  // Convert percentage to a regular number and ensure it does not exceed 100%
  return Math.min(Number(percentageBigInt), 100);
};




  export const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;
  
    if (img.complete) callback(true);
  
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  };


  const formatLargeNumber = (number, decimals = 2) => {
    if (number >= 1_000_000_000) {
      return (number / 1_000_000_000).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + "B"; // Billions
    }
    if (number >= 1_000_000) {
      return (number / 1_000_000).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + "M"; // Millions
    }
    if (number >= 1_000) {
      return (number / 1_000).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + "K"; // Thousands
    }
    return number.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }); // Below 1K
  };
  
  // Convert the amount (in Wei or Ether) into a shortened format
  export const formatEtherAmount = (amount) => {
    const formattedAmount = parseFloat(ethers.formatEther(amount.toString()));
    return formatLargeNumber(formattedAmount);
  };