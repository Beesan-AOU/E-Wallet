import React, { Component } from 'react'
import CalenderAd from './calenderAd';
import MathAd from './mathAd';
import "../styles/adsSection.css"
function AdsSection() {
    return ( 
        <div className="adsSectionContainer">
            <CalenderAd/>
            <div className="divider"></div>
            <MathAd/>
        </div>
     );
}

export default AdsSection;