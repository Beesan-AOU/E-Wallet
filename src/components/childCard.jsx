import React, { Component } from 'react';
import "../styles/childCard.css"
function ChildCard() {
    return ( 
        <div className="childCardContainer">
        <div className="cardContentContainer">
            <div className="childInfoContainer">
                <h1 className='childName cardText'>Ali Ahmad</h1>
                <div className="childBalanceContainer">
                    <div className="coinImage"></div>
                    <h1 className='childBalance cardText'>0 SR</h1>
                </div>
            </div>
            <div className="childImageContainer">

            </div>
        </div>
        <div className="actionButtonsContainer">
            <div className="editIconContainer homeIcon">
            </div>
            <div className="historyIconContainer homeIcon">

            </div>
        </div>
        </div>

     );
}

export default ChildCard;