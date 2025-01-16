import './App.css';
import { Routes, Route , useNavigate} from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreateCamign from './pages/CreateCampain';
import CampaignDetails from './pages/CampaignDetails';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import DonarImpact from './pages/DonarImpact';
import Footer from "./components/Footer"
import ContactUs from "./pages/ContactUs"
import About from "./pages/About"
import { useEffect, useContext } from 'react';
import {Web3Context} from "./context/Web3Context"



function App() {

    const {selectedAccount} = useContext(Web3Context)
    const navigate = useNavigate();

      useEffect(()=>{
          if(!selectedAccount){
            navigate('/');
          }else{
            navigate('/dashboard');
          }
      }, [selectedAccount])
    

  return (
    <div className="relative p-4  flex justify-center flex-row ">
      {/* Sidebar (Visible only on laptops and larger screens) */}
      

      {/* Main Content (Flex to take available space) */}
      <div className="flex-1  mx-auto ">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/create-campaign" element={<CreateCamign />} />
          <Route path="/campaign-details/:Id" element={<CampaignDetails />} />
          <Route path="/donar-impact" element={<DonarImpact />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/aboutUs" element={<About/>} />
        </Routes>

        <Footer/>
      </div>
    </div>
  );
}

export default App;