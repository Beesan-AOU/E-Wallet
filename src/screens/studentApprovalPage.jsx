import { signOut } from "firebase/auth";
import React, { Component } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/studentApprovalPage.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../App";
import { useState } from "react";



function StudentApprovalPage() {
  const { studentID } = useParams();
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState({});
  const [isNotFound, setIsNotFound] = useState(false);
  const [name, setName] = useState("Mohammed");
  const [isLoading, setIsLoading] = useState(false);
  const fetchStudentInfo = async () => {
    const docRef = doc(db, "children", studentID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("doc exists")
      setStudentInfo(docSnap.data());
      console.log("doc data is " + JSON.stringify(docSnap.data()))
      return(docSnap.data())
    } else {
      setIsNotFound(true);
    }
}
  const handleDecline = () => {
    navigate("/search");
  }
  const handleApproval = () => {
    navigate("/purchase", {state: studentInfo});
  }
  useEffect(() => {
    setIsLoading(true);
    fetchStudentInfo().then(res => {
      setIsLoading(false);
      console.log("studentInfo is: " + JSON.stringify(res));
      setName({test: "hello"});
      console.log("studentInfo is: " + JSON.stringify(studentInfo));

    }).catch(err => {
      console.log(err);
    })
    console.log("studentID is " + studentID)
    if (!(window.localStorage.getItem("isLoggedIn") == "true")) {
        navigate("/");
    }
} , [])
  return (
    isLoading? null:
    <div className="studentApprovalPageContainer">
      <img
        src={require("../assets/approvalPageLeftBgPart.png")}
        alt=""
        className="approvalPageLeftBgPart"
      />
      <img
        src={require("../assets/approvalPageRightBgPart.png")}
        alt=""
        className="approvalPageRightBgPart"
      />
      <div className="approvalMainContentContainer">
        <div className="studentImageContainer">
          <img src={require("../assets/sampleBoyImage.png")} alt="" className="studentImage"/>
        </div>
        <p className="approvalStudentName">{studentInfo.name}</p>
        <input
          type={"text"}
          className="inputField approvalInputField"
          disabled
          value={studentID}
        />

        <div className="actionButtonsContainer">
            <div className="approvalActionButton approvalButton">
                <p className="approvalActionButtonText" onClick={handleApproval}>Approve</p>
            </div>
            <div className="approvalActionButton declineButton" onClick={handleDecline}>
                <p className="approvalActionButtonText">Decline</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default StudentApprovalPage;
