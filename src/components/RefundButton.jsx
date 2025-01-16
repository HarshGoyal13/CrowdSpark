import React, { useContext } from 'react';
import { Web3Context } from "../context/Web3Context";
import toast from 'react-hot-toast';

const RefundButton = ({ id }) => {

    const {  contractInstance } = useContext(Web3Context);

    const handleClick = async (id) => {
        try {
            // Call the refundSpecific function from the contract with the provided campaign ID
            const tx = await contractInstance.refundSpecific(id);
            await tx.wait(); // Wait for the transaction to be mined
            toast.success("Refund received successfully");
        } catch (error) {
            console.log(error);
            toast.error("Refund failed: " + error.message);
        }
    }

    return (
        <div className="flex justify-center items-center mt-20">
            <button 
                onClick={() => handleClick(id)} // Pass the campaign ID here
                className="group relative inline-flex items-center text-green-500 text-lg font-semibold py-2 px-6 hover:text-green-600"
            >
                <span className="mr-2">Donate with confidence — get a refund if the campaign doesn't succeed</span>
                <span className="group-hover:translate-x-2 transform transition duration-300">
                    &rarr; 
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-green-500 to-green-800 scale-x-0 group-hover:scale-x-100 transform transition duration-300"></span>
            </button>
        </div>
    );
}

export default RefundButton;
