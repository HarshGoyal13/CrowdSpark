import React, { useState, useContext, useEffect } from 'react';
import { Web3Context } from "../context/Web3Context";
import FormField from '../components/FormField';
import toast from 'react-hot-toast';
import { uploadFileToPinata } from "../utils/Pinata";
import { FiUpload } from 'react-icons/fi';

import Loader from '../components/Loader';

const DonarImpact = () => {
    const { contractInstance} = useContext(Web3Context);

      const [message, setMessage] = useState();

    const [impact, setImpact] = useState([]);
    const [formData, setFormData] = useState({
        address: "",
        image: "",
        description: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFormData = (fieldName, e) => {
        setFormData({ ...formData, [fieldName]: e.target.value });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
    
        if (!file) return;
    
        try {
          setIsLoading(true);
          setMessage("Wait For Image Uploading");
          const ipfsHash = await uploadFileToPinata(file);
          setFormData({ ...formData, image: `https://gateway.pinata.cloud/ipfs/${ipfsHash}` });
          toast.success("Image uploaded successfully!");
        } catch (error) {
          console.error("Error uploading file:", error);
          toast.error("Failed to upload image. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;  // Prevent multiple submissions

        const { address, image, description } = formData;
        if (!address || !image || !description) {
            toast.error("All fields are required.");
            return;
        }
        setIsSubmitting(true);
        try {
            const tx = await contractInstance.setDonorImpactImage(address, image, description);
            console.log("Transaction: ", tx);
            toast.success("Donation Impact Post Successfully");

            setFormData({ address: "", image: "", description: "" });
            getAllImpactDonates(); // Refresh the impacts list
        } catch (error) {
            toast.error(error.message || "Submission failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getAllImpactDonates = async () => {
        setIsLoading(true);
        try {
            const data = await contractInstance.getAllImpact();
            const impactArray = Array.from(data).map((campaign) => ({
                address: campaign[0],
                image: campaign[1],
                description: campaign[2],
            }));
            setImpact(impactArray);
        } catch (error) {
            toast.error(error.message || "Failed to fetch impacts.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (contractInstance) {
            getAllImpactDonates();
        }
    }, [contractInstance]);

    return (
        <div className="container mx-auto p-6">
                  {isLoading && <Loader message={message} />}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Form Section */}
                <div className="form-container w-full md:w-1/2 bg-[#1c1c24] p-6 rounded-lg shadow-lg">
                    <h2 className="text-white font-bold text-2xl mb-4">Set Donor Impact</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormField
                            labelName="Address*"
                            placeholder="Enter Your Address"
                            inputType="text"
                            value={formData.address}
                            handleChange={(e) => handleFormData("address", e)}
                        />

                          <div className="flex flex-col items-center">
                             <label className="w-full flex justify-center items-center border-[#3a3a43] border-2 rounded-lg py-5 px-8 text-white hover:bg-[#4b4b58] cursor-pointer transition-all duration-200">
                               <FiUpload size={24} color="#8c6dfd" />
                               <input
                                 type="file"
                                 accept="image/*"
                                 onChange={handleFileUpload}
                                 className="hidden"
                               />
                             </label>
                             {formData.image && (
                               <div className="mt-4 text-center">
                                 <p className="text-white text-lg mb-2">Image Preview</p>
                                 <img
                                   src={formData.image}
                                   alt="Uploaded Campaign"
                                   className="w-full max-w-[300px] h-auto object-cover rounded-lg shadow-lg"
                                 />
                               </div>
                             )}
                           </div>
                   

                        <FormField
                            labelName="Description*"
                            placeholder="Enter Description"
                            inputType="text"
                            value={formData.description}
                            handleChange={(e) => handleFormData("description", e)}
                        />

                        <button 
                            type="submit" 
                            className="bg-[#1dc071] text-white font-semibold p-3 rounded-md w-full hover:bg-[#16b35c] transition" 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Impact"}
                        </button>
                    </form>
                </div>

                {/* Impact List Section */}
                <div className="impact-container w-full md:w-1/2 bg-[#1c1c24] p-6 rounded-lg shadow-2xl">
                    <h2 className="text-white font-bold text-2xl mb-4">Donor Impacts</h2>
                    <div className="impact-list space-y-4">
                        {isLoading ? (
                            <p className="text-white">Loading impacts...</p>
                        ) : impact.length > 0 ? (
                            impact.map((imp, index) => (
                                <div key={index} className="impact-item p-4 rounded-lg shadow-lg">
                                    <h3 className="font-semibold text-[12px] text-white"><span className='text-[#808191] text-[10px]'>Owner Address : </span> {imp.address}</h3>
                                    <img src={imp.image} alt="Impact" className="w-full h-48 object-cover rounded-lg my-2" />
                                    <p className="text-white"><span className='text-[#808191] text-[10px]'>Post Description : </span>{imp.description}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No donor impacts to display.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonarImpact;
