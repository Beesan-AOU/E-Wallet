import React, { Component } from 'react';
import "../styles/mathAd.css";

function MathAd() {
    return ( 
        <div className="mathAdContainer">
            <img src={require("../assets/mathAdImage.png")} alt="math Image" className='mathAdImage'/>
            <p className='mathAdText'>Register <br/>your child in <br/>the math <br/>contest !</p>
            <p className='readMoreText'>Read more</p>
        </div>
     );
}

export default MathAd;