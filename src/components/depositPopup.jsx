import React, { Component } from "react";
import { useState } from "react";
import "../styles/depositPopup.css";
function DepositPopup() {
  const [cardNumber, setCardNumber] = useState("");
  const [CVV, setCVV] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const handleCVV = (newValue) => {
    if (newValue.length <= 3) {
      setCVV(newValue);
    }
  }

  const handleCardNumberInput = (newValue) => {
    if (Number(newValue.replace(/\s+/g, '')) || newValue == "") {
      if (
        (newValue.length == 4 ||
          newValue.length == 12 ||
          newValue.length == 20) &&
        newValue.length != 0 &&
        newValue.length != 28
      ) {
        setCardNumber(newValue + "    ");
      } else if (
        newValue.length == 7 ||
        newValue.length == 15 ||
        newValue.length == 23
      ) {
        setCardNumber(newValue.slice(0, newValue.length - 4));
      } else if (newValue.length <= 28) {
        setCardNumber(newValue);
      }
    }
    
  };
  return (
    <div className="depositPopupContainer">
      <div className="depositLeftPartContainer">
        <div className="depositAmountContainer">
          <p className="depositAmountTitle">Amount</p>
          <div className="depositAmountInputContainer">
            <input type="number" name="" value={depositAmount} className="depositAmountInput" onChange={
              (event) => {
                //only allow 3 digits for the deposit amount
                if (event.target.value.length <= 3) {
                  //update the deposit amount value
                  setDepositAmount(event.target.value);
                }
              }
            }/>
            <p className="depositAmountInputLabel">SR</p>
          </div>
        </div>
        <div className="depositSectionContainer">
          <div className="depositSectionTitleContainer">
            <p className="depositSectionTitle">Card Number</p>
            <div className="cardNumberIconContainer">
              <img
                src={require("../assets/cardNumberIcon.png")}
                alt=""
                className="cardNumberIcon"
              />
            </div>
          </div>
          <div className="depositSectionInputContainer">
            <input
              type="text"
              value={cardNumber}
              name=""
              className="depositAmountInput cardNumberInput"
              placeholder="XXXX    XXXX    XXXX    XXXX"
              onChange={(event) => {
                handleCardNumberInput(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="depositSectionContainer">
          <div className="depositSectionTitleContainer">
            <p className="depositSectionTitle">Name on Card</p>
          </div>
          <div className="depositSectionInputContainer">
            <input
              type="text"
              value={cardHolder}
              name=""
              className="depositAmountInput cardNumberInput"
              placeholder="Card Holder Name"
              onChange={(event) => {
                setCardHolder(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="depositSectionContainer date-cvv-container">
          <div className="dateSection">
            <div className="depositSectionTitleContainer">
              <p className="depositSectionTitle">Expiration Date</p>
            </div>
            <div className="depositSectionInputContainer DateDropdownMenuSection">
              <select name="month" id="monthSelect" className="dateDropDownMenu">
                <option value="" disabled selected className="monthPlaceholder">
                  Month
                </option>
                <option value="1">Januray</option>
                <option value="2">Feburary</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">Septemper</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <select name="year" id="yearSelect" className="dateDropDownMenu yearDropDownMenu">
                <option value="" disabled selected className="yearPlaceholder">
                  Year
                </option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>
          </div>
          <div className="cvvSection">
            <div className="depositSectionTitleContainer">
              <p className="depositSectionTitle">CVV</p>
            </div>
            <div className="depositSectionInputContainer">
              <input
                type="number"
                value={CVV}
                name=""
                className="depositAmountInput cvvInput"
                placeholder="XXX"
                onChange={(event) => {
                  handleCVV(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="depositRightPartContainer">
        <div className="depositSectionDivider">
        </div>
        <div className="depositRightPartContentContainer">
            <p className="depositRightPartTitle">
              Accepted Cards
            </p>
            <div className="acceptedCardsImagesContainer">
              <img src={require("../assets/mada_image.png")} alt="" className="acceptedCard" />
              <img src={require("../assets/visa_image.png")} alt="" className="acceptedCard" />
              <img src={require("../assets/mastercard_image.png")} alt="" className="acceptedCard" />
            </div>
            <div className="proceedButtonContainer">
              <p className="proceedButtonText">Proceed To Payment</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default DepositPopup;
