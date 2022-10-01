import React, { Component } from 'react';
import { useState } from 'react';
import "../styles/studentSearchPage.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../App';
import { Navigate, useNavigate } from 'react-router-dom';

function StudentSearchPage() {

    const navigate = useNavigate();

    const handleSearch = async () => {

        const docRef = doc(db, "children", studentID);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            //edit
            navigate("/approval", {state: docSnap.data()});
        } else {
          setErrorMessage("Student doesn't exist on our database");
        }
    }


    const [studentID, setStudentID] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    return ( 
        <div className="studentSearchPageContainer">
            <img src={require("../assets/studentSearchUpperBgPart.png")} alt="" className='studentSearchUpperBgPart'/>
            <img src={require("../assets/studentSearchLowerBgPart.png")} alt="" className='studentSearchLowerBgPart'/>
            <div className="formContentContainer">
                <img src={require("../assets/studentSearchWelcomingImage.png")} alt="" className='welcomingImage'/>
                <input type="text" name="studentID" id="studentID" className='FormInputField' placeholder='Enter the student ID' onChange={(event) => {
                    setStudentID(event.target.value);
                    setErrorMessage("");
                }}/>
                <input type="button" value="Search" onClick={() => {
                    handleSearch().then((promise) => {
                        console.log("success")
                    }).catch((error) => {
                        console.log("error")
                    })
                }} className='searchButton'/>
                {errorMessage !== ""? <p className='errorMessage'>{errorMessage}</p>: null}
            </div>
        </div>
     );
}

export default StudentSearchPage;