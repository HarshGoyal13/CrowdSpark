import React from 'react';
import CustomButton from "./CustomButton";

const ContractGridArray = [
  {
    order: -1,
    heading: "Seamless Donations via",
    highlightText: "Ethereum Blockchain",
    description:
      "Our platform uses Ethereum smart contracts to ensure secure and transparent donations directly to campaigns. Every donation is tracked on the blockchain, ensuring immutability and trust.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Smart Contract Management",
    description:
      "Smart contracts are the backbone of our platform, automating actions such as donations, refunds, and campaign management to ensure complete transparency and efficiency.",
  },
  {
    order: 2,
    heading: "Decentralized Storage",
    description:
      "We store all campaign data and donation records securely on IPFS (InterPlanetary File System), ensuring the integrity and decentralization of all information.",
  },
  {
    order: 3,
    heading: "Secure Transaction Processing",
    description:
      "Our smart contracts ensure that every transaction is secure, automated, and processed without the need for intermediaries, providing an efficient and trustworthy experience for both donors and recipients.",
  },
  {
    order: 4,
    heading: "Transparency and Accountability",
    description:
      "Every transaction is recorded on the blockchain, ensuring that both donors and recipients have full visibility of the donations and campaign progress in real time.",
  },
  {
    order: 5,
    heading: "Efficient Fund Distribution",
    description:
      "The smart contract ensures that funds are distributed directly to the campaign's wallet, reducing administrative overhead and guaranteeing that donations are used for their intended purpose.",
  },
];

const ContractGrid = () => {
  return (
    <div className='grid mx-auto grid-col-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit'>
        {
          ContractGridArray.map((card, index) => {
            return (
              <div 
              key={index}
              className={`${index === 0 && "lg:col-span-2 lg:h-[280px] p-5"}
              ${card.order % 2 === 1 ? "bg-richblack-700 p-5 lg:h-[280px]" : "bg-richblack-800 p-5 lg:h-[280px]"}
              ${card.order === 3 && "lg:col-start-2"}
              ${card.order < 0 && "bg-transparent"}

              `}
              >
                {
                  card.order < 0 ? (
                    <div className='lg:w-[90%] flex flex-col pb-3 gap-3'>
                    <div className='text-4xl font-semibold'>
                        {card.heading}
                        <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'>{card.highlightText}</span>
                   </div>
                        <p className='font-small'>{card.description}</p>
                      <div className='w-fit mt-2'>
                      <CustomButton 
                        btnType="button"
                        title={card.BtnText}
                        styles={"bg-yellow-50 text-black justify-center ml-[150px]"}
                    />
                        </div>
                    </div>
                  ) : (
                    <div className='flex flex-col gap-8 p-4'>
                      <h1 className='text-gray-200 font-bold'>{card.heading}</h1>
                      <p className='text0richblack-300 font-small mt-[-30px]'>{card.description}</p>

                    </div>
                    
                  )
                }
              </div>
            )
          })
        }
    </div>
  );
};

export default ContractGrid;
