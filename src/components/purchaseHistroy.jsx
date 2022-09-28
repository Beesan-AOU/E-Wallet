import React, { Component } from 'react'
import "../styles/purchaseHistory.css";
import PurchaseHistroyItemCard from './purchaseHistoryItemCard';

function PurchaseHistroy() {
    return ( 
        <div className="purchaseHistoryContainer">
            <p className="purchaseHistroyTitle">Purchase history</p>
            <div className="purchaseHistoryItemCards">
            <PurchaseHistroyItemCard/>
            <PurchaseHistroyItemCard/>

            <PurchaseHistroyItemCard/>
            <PurchaseHistroyItemCard/>
            <PurchaseHistroyItemCard/>
            <PurchaseHistroyItemCard/>

            </div>

        </div>
     );
}

export default PurchaseHistroy;