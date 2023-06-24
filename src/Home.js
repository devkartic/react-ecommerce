import React from 'react';
import HeroSection from './components/HeroSection';
import Services from './components/Services';
import Trusted from './components/Trusted';
import FeatureProduct from "./components/FeatureProduct";

const Home = () => {
    const myData = {name: 'Thapa Store'};
    return (
        <>
            <HeroSection myData={myData}/>
            <FeatureProduct/>
            <Services/>
            <Trusted/>
        </>
    );
}

export default Home;