import React, { Component } from 'react';
import "../styles/purchaseHistroyItemCard.css";

function PurchaseHistroyItemCard() {
    return ( 
        <div className="tempContainer">
        <div className="purchaseHistroyItemCardContainer">
            <div className="purchaseHistroyCardLeft">
                <p className="purchaseHistroyCardQuantity">4x</p>
                <div className="purchaseHistoryCardImageContainer">
                    <img src={"https://firebasestorage.googleapis.com/v0/b/kidsewallet.appspot.com/o/Almarai%20Fruit%20Juice.png?alt=media&token=92d94592-5c36-40ec-a14f-b7e7d167f57e"} alt="" className="purchaseHistoryCardImage" />
                </div>
                <p className="purchaseHistroyCardName">Lays Ketchup Chips</p>
            </div>
            <div className="purchaseHistroyCardRight">
                <div className="purchaseHistoryAmountContainer">
                    <img src={require("../assets/coinImage.png")} alt="" className="purchaseHistoryCoinImage" />
                    <p className="purchaseHistroyAmount">4 SR</p>
                </div>
                <p className="purchaseHistoryCardDate">17/8/2022</p>
            </div>
        </div>
        </div>

     );
}

export default PurchaseHistroyItemCard;