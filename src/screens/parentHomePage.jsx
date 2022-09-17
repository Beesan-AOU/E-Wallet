import React, { Component } from 'react'
import AdsSection from '../components/adsSection';
import CalenderAd from '../components/calenderAd';
import ChildCard from '../components/childCard';
import MathAd from '../components/mathAd';
import "../styles/parentHomePage.css"

function ParentHomePage() {
    return ( 
        <div className="parentHomePageContainer">
            <div className="headerContainer">
                <div className="parentInfoContainer">
                    <div className="parentImage">
                    </div>
                    <div className="welcomingTextContainer">
                    <h1 className='welcomingText'>Hello, <span className='welcomingText parentText'>Parents</span></h1>
                    </div>
                </div> 
                <p className='logoutText'>Log out</p>
                
            </div>
            <ChildCard/>
            <ChildCard/>
            <AdsSection/>
            <div className="footerContainer">
                <img src={require("../assets/ParentHomePageLowerBgPart.png")} alt="" className='parentHomePageLowerBgPart'/>
                <div className="footerSocials">
                <p className='footerText'>Find us on</p>
                <div className="socialsContainer">
                    <img src={require("../assets/instagramLogo.png")} alt="" className='socialLogo'/>
                    <div className="socialLogoContainer">
                        <img src={require("../assets/twitterLogo.png")} alt="" className='socialLogo'/>
                    </div>
                    <div className="socialLogoContainer">
                        <img src={require("../assets/whatsappLogo.png")} alt="" className='socialLogo'/>
                    </div>
                </div>
                </div>
                <div className="footerLocationInfo">
                    <img src={require("../assets/locationIcon.png")} alt="" className='locationImage'/>
                    <div className="locationInfo">
                        <p className='locationText'>www.uis.com</p>
                        <p className='locationText'>King fahad Rd, Riyadh</p>
                    </div>
                </div>

            </div>
        </div>
     );
}

export default ParentHomePage;