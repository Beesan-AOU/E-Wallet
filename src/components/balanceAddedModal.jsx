import React, { Component } from 'react';
import "../styles/balanceAddedModal.css";
function BalanceAddedModal(props) {
    const {addedAmount} = props;
    const {setIsAmountAddedModalShown} = props;
    return ( 
        <div className="balanceAddedModalContainer">
            <img src={require("../assets/closeIcon.png")} alt="" className="balanceAdded-CloseIcon" onClick={
                () => {
                    setIsAmountAddedModalShown(false);
                }
            }/>
            <div className="balanceContainer">
                <img src={require("../assets/coinImage.png")} alt="" className="coinIcon" />
                <p className="balanceAmount">{addedAmount} SR</p>
            </div>
            <img src={require("../assets/checkIcon.png")} alt="" className="checkIcon" />
            <p className='successMessage'>Amount added to wallet successfully</p>
        </div>
        );
}

export default BalanceAddedModal;