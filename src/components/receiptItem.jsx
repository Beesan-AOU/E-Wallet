import React, { Component } from "react";
import "../styles/purchasePage.css";
import { computeTotal } from "./productCard";

function ReceiptItem(props) {
  const { item } = props;
  const { receiptItems } = props;
  const { setReceiptItems } = props;
  const { setTotalAmount } = props;
  const removeItem = (event) => {
    let newArray = receiptItems.filter((filterItem) => {
      return filterItem.itemName != event.target.id;
    });
    setReceiptItems(newArray);
    computeTotal(newArray, setTotalAmount);
  };

  return (
    <div className="singleItemContainer">
      <div className="itemSection">
        <p className="itemQuantity">{`x${item.quantity}`}</p>
        <p className="itemName">{item.itemName}</p>
      </div>
      <div className="itemSection">
        <div className="itemPriceContainer">
          <div className="itemCoinImageContainer">
            <img
              src={require("../assets/coinImage.png")}
              alt=""
              className="itemCoinImage"
            />
          </div>
          <p className="itemPrice">{item.totalPrice}</p>
        </div>
        <div
          className="removeItemIconContainer"
          id={item.itemName}
          onClick={removeItem}
        >
          <img
            src={require("../assets/removeItemIcon.png")}
            alt=""
            className="removeItemIcon"
            id={item.itemName}
          />
        </div>
      </div>
    </div>
  );
}

export default ReceiptItem;
