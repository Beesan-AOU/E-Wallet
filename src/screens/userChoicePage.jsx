import React, { Component } from 'react'
import "../styles/userChoicePage.css"

function UserChoicePage() {
    return ( 
        <div className="userChoiceScreenContainer">
            <div className="backgroundElementsContainer">
                <div className="userChoiceRightBgPartContainer"></div>
                <div className="userChoiceLowerBgPartContainer"></div>
                <div className="userChoiceleftBgPartContainer"></div>
            </div>
            <div className="mainChoicesContainer">
                <div className="choiceContainer">
                    <div className="parentChoiceImageContainer choiceImage"></div>
                    <div className="divider"></div>
                    <h2 className='choiceText'>Are you a parent?</h2>
                </div>

                <div className="choiceContainer">
                    <div className="schoolChoiceImageContainer choiceImage"></div>
                    <div className="divider"></div>
                    <h2 className='choiceText'>Are you a school?</h2>
                </div>
            </div>
        </div>
     );
}

export default UserChoicePage;