import React, { Component } from 'react';
import "../styles/calenderAd.css";

function CalenderAd() {
    return ( 
        <div className="calenderAdContainer">
            <img src={require("../assets/calenderAdImage.png")} alt="Art Image" className='calenderAdImage'/>
            <p className='calenderAdText'>Mark your <br/>calendars for the <br/>fun day !</p>
            <p className='readMoreText'>Read more</p>
        </div>
     );
}

export default CalenderAd;