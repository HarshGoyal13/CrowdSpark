


import React, { useEffect, useState } from 'react'
import { Web3Context } from './Web3Context'
import GetWeb3State from '../utils/GetWeb3State'
import { useNavigate } from 'react-router-dom'
import { HandelAccountChange } from "../utils/HandelAccountChange"
import { HandelChainChange } from "../utils/HandelChainChange"

const Web3Provider = ({children}) => {

        const navigate = useNavigate();

    const [web3State, setWeb3State] = useState({
        contractInstance : null,
        selectedAccount: null,
        chainId: null,
    })

    const handelwallet = async()=>{
        try{

            const {contractInstance,selectedAccount , chainId} = await GetWeb3State();
            setWeb3State({contractInstance,selectedAccount , chainId})
            navigate("/dashboard")
            console.log(contractInstance,selectedAccount , chainId);

        }catch(error){
            console.log(error);
        }
    }

    
    useEffect(()=>{
        // accountsChanged: Triggered when the user switches accounts in MetaMask.
        window.ethereum.on('accountsChanged',()=> HandelAccountChange(setWeb3State));
  
        // chainChanged: Triggered when the user switches to a different blockchain network (e.g., Ethereum Mainnet to Polygon).
        window.ethereum.on('chainChanged',()=> HandelChainChange(setWeb3State));
  
        return ()=>{
        // Remove the listeners to avoid memory leaks or duplicate event handlers when the component is destroyed or re-rendered.
          window.ethereum.removeListener('accountsChanged',()=> HandelAccountChange(setWeb3State));
          window.ethereum.removeListener('chainChanged',()=> HandelChainChange(setWeb3State));
        }
  
      })

    return  (
        <>
            <Web3Context.Provider value={{...web3State, handelwallet}}>
                {children}
            </Web3Context.Provider>

            
        </>
    )
}

export default Web3Provider