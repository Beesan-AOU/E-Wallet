import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/userChoicePage.css";

function UserChoicePage() {
  const navigation = useNavigate();
  return (
    <div className="userChoiceScreenContainer">
      <div className="backgroundElementsContainer">
        <div className="userChoiceRightBgPartContainer"></div>
        <div className="userChoiceLowerBgPartContainer"></div>
        <div className="userChoiceleftBgPartContainer"></div>
      </div>
      <div className="mainChoicesContainer">
        <div
          className="choiceContainer"
          onClick={() => {
            navigation("/login", { state: { loginType: "parent" } });
          }}
        >
          <div className="parentChoiceImageContainer choiceImage"></div>
          <div className="divider"></div>
          <h2 className="choiceText">Are you a parent?</h2>
        </div>

        <div
          className="choiceContainer"
          onClick={() => {
            navigation("/login", { state: { loginType: "school" } });
          }}
        >
          <div className="schoolChoiceImageContainer choiceImage"></div>
          <div className="divider"></div>
          <h2 className="choiceText">Are you a school?</h2>
        </div>
      </div>
    </div>
  );
}

export default UserChoicePage;
