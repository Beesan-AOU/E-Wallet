import React, { Component } from 'react';
import LandingPageIllustration from '../components/landingPageIllustration';
import '../styles/LandingPage.css';
function LandingPage() {
    return ( 
            <div className='landingPageContainer'>
                <div className='titleContainer'>
                    <h1 className="title">Kids E-Wallet</h1>
                    <p className='appDescription'>Control what your kids <br/>consume at school</p>
                </div>
                <LandingPageIllustration/>
            </div>
        );
}

export default LandingPage;