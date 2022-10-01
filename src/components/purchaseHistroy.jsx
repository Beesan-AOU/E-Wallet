import React, { Component } from "react";
import "../styles/purchaseHistory.css";
import PurchaseHistroyItemCard from "./purchaseHistoryItemCard";

function PurchaseHistroy(props) {
  const { childData } = props;
  const {setIsPurchaseHistoryShown} = props;
  return (
    <div className="purchaseHistoryContainer">
      <img src={require("../assets/closeIcon.png")} alt="" className="histroy-closeIcon" onClick={
        () => {
          setIsPurchaseHistoryShown(false);
        }
      }/>
      <p className="purchaseHistroyTitle">Purchase history</p>
      <div className="purchaseHistoryItemCards">
        {childData.purchaseHistory.map((purchasedItem, index) => {
          return <PurchaseHistroyItemCard purchasedItem={purchasedItem} key={index}/>;
        })}
      </div>
    </div>
  );
}

export default PurchaseHistroy;
