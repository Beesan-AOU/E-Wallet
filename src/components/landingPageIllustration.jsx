import React, { Component } from 'react'
import "../styles/landingPageIllustration.css"
function LandingPageIllustration() {
    return (
        <React.Fragment>
            <img src={require("../assets/landingBackgroundCircle.png")} alt="" className='landingBackgroundCircle'/>
            <img src={require("../assets/upperCircleImage.png")} alt="" className='upperSmallCircle'/>
            <img src={require("../assets/lowerCircleImage.png")} alt="" className='lowerCircleImage'/>
            <img src={require("../assets/laptopImage.png")} alt="" className='laptopImage'/>
        </React.Fragment>
     );
}

export default LandingPageIllustration;