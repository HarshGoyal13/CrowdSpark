


import {ethers} from "ethers"
import abi from "../constant/abi.json"

const GetWeb3State = async() => {

    try{
        if(!window.ethereum){
            throw new Error("Metamask Not installed");
        }
        const accounts = await window.ethereum.request({
            method:"eth_requestAccounts"
        })

        const selectedAccount = accounts[0];

        const chainIdHex = await window.ethereum.request({
            method:"eth_chainId"
        })

        const chainId = parseInt(chainIdHex, 16);

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractAddress = "0xc2ffcce91f5125a2029749be6df996865b20856c";

        const message = `
      Hello ${selectedAccount},
      Welcome to Our Crowd Funding Dapp! 
      We're excited to have you on board.
    `;
        await signer.signMessage(message);

        const contractInstance = new ethers.Contract(contractAddress, abi, signer);
        return { contractInstance, selectedAccount, chainId };
    }catch(error){
        console.error("Error in GetWeb3State:", error);
        throw error;
    }
    

}

export default GetWeb3State