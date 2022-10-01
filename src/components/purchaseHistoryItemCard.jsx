import React, { Component } from 'react';
import "../styles/purchaseHistroyItemCard.css";

function PurchaseHistroyItemCard(props) {
    const {purchasedItem} = props;
    return ( 
        <div className="tempContainer">
        <div className="purchaseHistroyItemCardContainer">
            <div className="purchaseHistroyCardLeft">
                <p className="purchaseHistroyCardQuantity">{purchasedItem.quantity}x</p>
                <div className="purchaseHistoryCardImageContainer">
                    <img src={purchasedItem.image} alt="" className="purchaseHistoryCardImage" />
                </div>
                <p className="purchaseHistroyCardName">{purchasedItem.itemName}</p>
            </div>
            <div className="purchaseHistroyCardRight">
                <div className="purchaseHistoryAmountContainer">
                    <img src={require("../assets/coinImage.png")} alt="" className="purchaseHistoryCoinImage" />
                    <p className="purchaseHistroyAmount">{purchasedItem.price} SR</p>
                </div>
                <p className="purchaseHistoryCardDate">{purchasedItem.date}</p>
            </div>
        </div>
        </div>

     );
}

export default PurchaseHistroyItemCard;