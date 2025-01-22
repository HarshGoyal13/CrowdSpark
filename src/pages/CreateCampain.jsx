import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Web3Context } from '../context/Web3Context';
import { money } from '../assets';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
import { toast } from "react-hot-toast";
import { uploadFileToPinata } from "../utils/Pinata";
import axios from 'axios';
import { FiUpload } from 'react-icons/fi';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { contractInstance } = useContext(Web3Context);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    image: '',
    mail: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };


  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setIsLoading(true);
      setMessage("Wait For Image Uploading");
      const ipfsHash = await uploadFileToPinata(file);
      setForm({ ...form, image: `https://gateway.pinata.cloud/ipfs/${ipfsHash}` });
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
    if (!form.name || !form.title || !form.description || !form.target || !form.image) {
      toast.error("Please fill in all the fields.");
      return;
    }

    try {
      if (!contractInstance) {
        console.log("Contract Instance Not Found");
        return;
      }

      setIsLoading(true);
      setMessage("Wait For Campaign Creation");
      const res = await contractInstance.createCampign(form.title, form.description, form.target, form.image);
      if (res) {
        addInDb();
      }

      setIsLoading(false);
      navigate('/profile');
      toast.success(`${form.title} Campaign Created Successfully`);
    } catch (error) {
      console.error("Error while creating campaign:", error);
      setIsLoading(false);
      toast.error("Failed to create campaign. Please try again.");
    }
  };

  const addInDb = async () => {
    const dataToSend = {
      name: form.name,
      email: form.mail,
      target: form.target,
      campaignTitle: form.title,
      description: form.description,
      imageURl: form.image,
    };


    console.log("Data to Send", dataToSend);

    try {
      const res = await axios.post("https://crowdspark.onrender.com/api/v2/AddUser", dataToSend);
      console.log(res);
      if (res.status === 200) {
        toast.success(res.data.message || "Data added successfully!");
      }
    } catch (error) {
      console.error("Error in addInDb:", error.message);
      toast.error("Error adding data. Please try again.");
    }
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader message={message} />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName="Mail *"
            placeholder="Enter Your Mail"
            inputType="email"
            value={form.mail}
            handleChange={(e) => handleFormFieldChange('mail', e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

     

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

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
          {form.image && (
            <div className="mt-4 text-center">
              <p className="text-white text-lg mb-2">Image Preview</p>
              <img
                src={form.image}
                alt="Uploaded Campaign"
                className="w-full max-w-[300px] h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
