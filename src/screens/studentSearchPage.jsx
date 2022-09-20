import React, { Component } from 'react';
import "../styles/studentSearchPage.css";

function StudentSearchPage() {
    return ( 
        <div className="studentSearchPageContainer">
            <img src={require("../assets/studentSearchUpperBgPart.png")} alt="" className='studentSearchUpperBgPart'/>
            <img src={require("../assets/studentSearchLowerBgPart.png")} alt="" className='studentSearchLowerBgPart'/>
            <div className="formContentContainer">
                <img src={require("../assets/studentSearchWelcomingImage.png")} alt="" className='welcomingImage'/>
                <input type="email" name="email" id="email" className='FormInputField' placeholder='Enter the student ID'/>
                <input type="button" value="Search" className='searchButton'/>

            </div>
        </div>
     );
}

export default StudentSearchPage;