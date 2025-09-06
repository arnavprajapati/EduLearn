import React from 'react';
import Navbar from '../components/Navbar.jsx';
import HeroSection from '../components/HeroSection.jsx';       

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <HeroSection />   
        </div>
    );
};

export default Home;