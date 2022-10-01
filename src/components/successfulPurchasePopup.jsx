import React, { Component } from 'react'
import "../styles/successfulPurchasePopup.css"
function SuccessfulPurchasePopup(props) {
    return ( 
        <div className="successfulPurchasePopupContainer">
            <img src={require("../assets/closeIcon.png")} alt="" className='closeIcon' onClick={()=> {
                props.setTotalAmount(0);
                props.setSuccessfulPurchaseMsgShown(false);
            }}/>
            <div className="successfulAmountContainer">
                <img src={require("../assets/coinImage.png")} alt="" className="successfulCoinImage" />
                <p className="successfulAmount">{props.amount} SR</p>
            </div>
            <img src={require("../assets/checkIcon.png")} alt="" className="successfulCheckIcon" />
            <p className="successfulMessage">Purchase Successful</p>
        </div>
     );
}

export default SuccessfulPurchasePopup;