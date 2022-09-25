import React, { Component } from 'react';
import "../styles/balanceAddedModal.css";
function BalanceAddedModal() {
    return ( 
        <div className="balanceAddedModalContainer">
            <div className="balanceContainer">
                <img src={require("../assets/coinImage.png")} alt="" className="coinIcon" />
                <p className="balanceAmount">50 SR</p>
            </div>
            <img src={require("../assets/checkIcon.png")} alt="" className="checkIcon" />
            <p className='successMessage'>Amount added to wallet successfully</p>
        </div>
        );
}

export default BalanceAddedModal;