import React, { Component } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPageIllustration from '../components/landingPageIllustration';
import '../styles/LandingPage.css';

function LandingPage() {
    const navigation = useNavigate();

    useEffect(() => {
        window.localStorage.setItem("isLoggedIn", false);
    }, [])
    return (
        <div className='landingPageContainer'>
            <img src={require("../assets/cloud_image.png")} alt="" className="cloudImage cloudImage1" />
            <img src={require("../assets/cloud_image.png")} alt="" className="cloudImage cloudImage2" />
            <img src={require("../assets/cloud_image.png")} alt="" className="cloudImage cloudImage3" />
            <div className='titleContainer'>
                <h1 className="title">Kids E-Wallet</h1>

                <p className='appDescription'>Control what your kids <br/>consume at school</p>
            </div>
            <div className="landing-loginButtonContainer" onClick={()=> {
                navigation("/choice")
            }}>
                <p className="landing-loginButtonText">Login</p>
                <img src={require("../assets/landingArrowImage.png")} alt="" className='landingArrowImage'/>
            </div>
            <LandingPageIllustration/>
        </div>
    );
}

export default LandingPage;